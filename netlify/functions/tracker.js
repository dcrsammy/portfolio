// Private project tracker for OlawaleOS.
// Data lives in a private GitHub repo (tracker.json). Only the owner, with the password, can read or change it.
// Netlify env vars (never in code): TRACKER_PASSWORD, TRACKER_GITHUB_TOKEN (fine-grained, Contents read/write on the tracker repo).
const crypto = require("crypto");
const REPO = process.env.TRACKER_REPO || "dcrsammy/project-tracker";
const FILE = "tracker.json";

const json = (status, body) => ({ statusCode: status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(body) });
const sign = (exp) => crypto.createHmac("sha256", process.env.TRACKER_PASSWORD + "|olawaleos-tracker").update(String(exp)).digest("hex");
const makeToken = () => { const exp = Date.now() + 30 * 86400000; return exp + "." + sign(exp); };
function validToken(tok) {
  if (typeof tok !== "string") return false;
  const [e, s] = tok.split(".");
  if (!e || !s || +e < Date.now()) return false;
  const good = sign(e);
  return s.length === good.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(good));
}
function samePassword(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest(), y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}
const fails = new Map();
function tooManyFails(ip) { const now = Date.now(), list = (fails.get(ip) || []).filter((t) => now - t < 15 * 60000); fails.set(ip, list); return list.length >= 8; }
function noteFail(ip) { (fails.get(ip) || fails.set(ip, []).get(ip)).push(Date.now()); }

async function gh(method, body) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.TRACKER_GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "User-Agent": "olawaleos-tracker", "X-GitHub-Api-Version": "2022-11-28" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}
async function readData() {
  const res = await gh("GET");
  if (res.status === 404) return { data: { projects: [] }, sha: null };
  if (!res.ok) throw new Error("github_read_" + res.status);
  const j = await res.json();
  return { data: JSON.parse(Buffer.from(j.content, "base64").toString("utf8")), sha: j.sha };
}
async function writeData(data, sha, message) {
  const res = await gh("PUT", { message, content: Buffer.from(JSON.stringify(data, null, 2) + "\n").toString("base64"), ...(sha ? { sha } : {}) });
  if (res.status === 409 || res.status === 422) return false; // changed underneath us
  if (!res.ok) throw new Error("github_write_" + res.status);
  return true;
}
const now = () => new Date().toISOString();
function addLog(p, note) { p.log = [{ at: now(), note: String(note).slice(0, 400), by: "You" }, ...(p.log || [])].slice(0, 40); p.updatedAt = now(); }

function apply(data, b) {
  const p = (data.projects || []).find((x) => x.id === b.id);
  if (b.action === "addProject") {
    const name = String(b.name || "").trim().slice(0, 60);
    if (!name) return "Give the project a name.";
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40) || "p" + Date.now();
    if (data.projects.some((x) => x.id === id)) return "A project with that name already exists.";
    const kind = ["own", "client", "idea"].includes(b.kind) ? b.kind : "own";
    data.projects.push({ id, name, kind, status: kind === "idea" ? "Idea" : "In progress", url: "", milestones: [], log: [{ at: now(), note: "Project added", by: "You" }], updatedAt: now() });
    return null;
  }
  if (!p) return "Project not found.";
  p.milestones = p.milestones || [];
  if (b.action === "toggle") {
    const m = p.milestones[b.i]; if (!m) return "Milestone not found.";
    m.done = !!b.done; addLog(p, (m.done ? "Done: " : "Reopened: ") + m.t);
  } else if (b.action === "addMilestone") {
    const t = String(b.text || "").trim().slice(0, 120); if (!t) return "Write the milestone first.";
    p.milestones.push({ t, done: false }); addLog(p, "New milestone: " + t);
  } else if (b.action === "log") {
    const t = String(b.text || "").trim(); if (!t) return "Write what changed first.";
    addLog(p, t);
  } else return "Unknown action.";
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "POST only" });
  if (!process.env.TRACKER_PASSWORD || !process.env.TRACKER_GITHUB_TOKEN) return json(503, { error: "not_configured" });
  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"] || "anon";
  let b; try { b = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "bad_request" }); }

  if (b.action === "login") {
    if (tooManyFails(ip)) return json(429, { error: "Too many attempts. Try again in 15 minutes." });
    if (!samePassword(b.password || "", process.env.TRACKER_PASSWORD)) { noteFail(ip); return json(401, { error: "Wrong password." }); }
    return json(200, { token: makeToken() });
  }
  if (!validToken(b.token)) return json(401, { error: "locked" });

  try {
    if (b.action === "list") { const { data } = await readData(); return json(200, { projects: data.projects || [] }); }
    for (let attempt = 0; attempt < 2; attempt++) {
      const { data, sha } = await readData();
      data.projects = data.projects || [];
      const err = apply(data, b);
      if (err) return json(400, { error: err });
      if (await writeData(data, sha, `Tracker: ${b.action}${b.id ? " " + b.id : ""}`)) return json(200, { projects: data.projects });
    }
    return json(409, { error: "Someone else changed the tracker. Try again." });
  } catch (e) {
    console.error("tracker", e && e.message);
    return json(502, { error: "Couldn't reach the tracker data. Try again." });
  }
};
