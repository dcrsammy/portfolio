(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var mobileMQ=window.matchMedia("(max-width:860px)");
function isMobile(){ return mobileMQ.matches; }

/* ================= data ================= */
var SYSTEM=[
  {id:"about",label:"me.txt",glyph:"file",text:"TXT"},
  {id:"ask",label:"ask.sh",glyph:"term",text:">_"},
  {id:"work",label:"work",glyph:"folder",text:""},
  {id:"lab",label:"lab",glyph:"folder lab",text:""},
  {id:"orders",label:"Orders.app",glyph:"app",text:"₦"},
  {id:"phone",label:"Phone.3d",glyph:"cube",text:"3D"},
  {id:"services",label:"services.txt",glyph:"file",text:"TXT"},
  {id:"story",label:"story.md",glyph:"file",text:"MD"},
  {id:"contact",label:"contact.txt",glyph:"mail",text:"@"}
];
var PROJECTS=[
  {id:"digitalschool",name:"Digital School",kind:"app",sub:"Learning platform, my own product",status:"Live in beta",url:"https://japasch.netlify.app",host:"japasch.netlify.app",shot:"shots/digitalschool.jpg",
   desc:"A subscription school teaching digital skills that get people paid by US and UK clients. Learners take courses, submit practical tasks that get graded, and earn certificates employers can verify. It comes with a course builder, grading queue, learner management and analytics.",stack:"Next.js, PostgreSQL (Supabase), Prisma, Paystack, Netlify"},
  {id:"foodtalk",name:"FoodTalk",kind:"app",sub:"Food discovery app, my own product",status:"In development",color:["#ff6b3d","#b3261e"],mark:"Ft",
   desc:"TikTok-style food discovery for Lagos. Restaurants post short videos of their food, and customers order, book a table or leave a review straight from the feed. Payments split automatically between restaurant and platform, with a vendor dashboard and an admin panel.",stack:"React Native, Node.js, PostgreSQL, Paystack Split Payments, Cloudinary"},
  {id:"citypulse",name:"CityPulse NG",kind:"app",sub:"Mobile app, my own product",status:"In testing on Google Play",url:"https://city-pulse.live",host:"city-pulse.live",shot:"shots/citypulse.jpg",
   desc:"A city app for Lagos: find places and events, book reservations and chat with vendors, all in one place, with a vendor dashboard behind it. Designed and built solo, from backend to Play Store.",stack:"React Native, Node.js, PostgreSQL, Socket.IO, Paystack"},
  {id:"mayree",name:"Mayree",kind:"store",sub:"Online store",status:"Live",url:"https://mayree.co",host:"mayree.co",shot:"shots/mayree.jpg",
   desc:"A luxury handbag brand and store with two product lines, The Edit and By Request, a video-led homepage, Paystack checkout and an admin panel with a content editor.",stack:"Supabase, Paystack, custom admin"},
  {id:"afrosteeze",name:"AFRO STEEZE",kind:"store",sub:"Client, Nigerian fashion brand",status:"Live",url:"https://afrosteeeze.com",host:"afrosteeeze.com",shot:"shots/afrosteeze.jpg",
   desc:"A 20+ page custom store with its own admin panel. I also fixed the async Paystack callback issue that quietly breaks checkout on a lot of Nigerian stores.",stack:"JavaScript, Cloudinary, Paystack, Netlify"},
  {id:"omaq",name:"OMAQ Foods",kind:"site",sub:"Client, UK catering business",status:"Live",url:"https://omaqfoods.netlify.app",host:"omaqfoods.netlify.app",shot:"shots/omaq.jpg",
   desc:"Online ordering for a UK African catering business. Customers pay by card, and every new order lands on the owner's WhatsApp. The owner manages everything from a password-protected dashboard.",stack:"Stripe Checkout, Supabase, Netlify Functions"},
  {id:"bankapp",name:"Banking web app",kind:"app",sub:"Client, US fintech",status:"In development",color:["#1f3a5f","#0b1a2e"],mark:"$",
   desc:"The customer web app for a US banking client that moves real money. The client handles licensing and banking partners, and I'm building the product. Details stay private until launch.",stack:"Web app"},
  {id:"adunni",name:"Adunni Hair Studio",kind:"site",sub:"Booking site and shop",status:"In progress",url:"/demos/adunni/",host:"demo",shot:"shots/adunni.jpg",
   desc:"A hair studio site where clients shop products and book braids, installs, ponytails, revamps, consultations and styling. Fixed time slots with one client per slot, so the stylist can never be double-booked.",stack:"HTML, CSS, JavaScript, live availability"},
  {id:"altamar",name:"Altamar Privé",kind:"site",sub:"Sailing charters, Ensenada, Mexico",status:"Pitch demo",url:"/demos/altamar/",host:"demo",shot:"shots/altamar.jpg",
   desc:"A multi-page site for a luxury sailing charter business: the fleet, sunset and winery cruises, partner wineries and a booking request flow, with an English and Spanish switch.",stack:"HTML, CSS, JavaScript, English/Spanish"},
  {id:"primeautos",name:"Prime Autos Lagos",kind:"site",sub:"Car dealer website",status:"Demo",url:"/demos/primeautos/",host:"demo",shot:"shots/primeautos.jpg",
   desc:"A website for Lagos car dealers: every car on the yard with real photos, mileage and the price on the glass, filters by brand and budget, and one-tap call or WhatsApp. Built to pitch dealers like BimBim Autos.",stack:"HTML, CSS, JavaScript, WhatsApp"},
  {id:"isinmi",name:"Isinmi Stays",kind:"site",sub:"Short-let booking website",status:"Demo",url:"/demos/isinmi/",host:"demo",shot:"shots/isinmi.jpg",
   desc:"A booking site for short-let hosts in Ikoyi, Lekki and Victoria Island. Guests pick dates, see the real price and book straight with the host on WhatsApp.",stack:"HTML, CSS, JavaScript, WhatsApp"},
  {id:"stylefinder",name:"Style Finder",kind:"app",sub:"AI personal stylist, my own product",status:"In development",url:"https://stylefinde.netlify.app",host:"stylefinde.netlify.app",shot:"shots/stylefinder.jpg",
   desc:"Upload a selfie and a full-length photo, and AI works out your skin tone, undertone, colour palette and body shape, then recommends clothes that suit you. A colour drape on your own selfie confirms the palette, and a full style report is the paid upgrade. Photos are analysed and deleted, never stored.",stack:"JavaScript, Claude vision, Netlify Functions"},
  {id:"fitcheck",name:"FitCheck",kind:"app",sub:"AI stylist, my own product",status:"Back soon",color:["#7b5cff","#3b2a8f"],mark:"Fc",
   desc:"An AI stylist. Upload your wardrobe, get outfits built from what you already own, and plan what to wear for the week. Paid plans with usage limits.",stack:"Claude API, Supabase, Cloudinary, Paystack subscriptions"},
  {id:"eirlyn",name:"Eirlyn",kind:"app",sub:"Platform for the US and UK",status:"MVP complete",color:["#1f6f6b","#0e3b43"],mark:"Ei",
   desc:"Legacy and estate planning: an investment dashboard, time-locked Legacy Capsules, a beneficiary portal, identity checks and an admin dashboard.",stack:"React, TypeScript, Supabase, Stripe, Persona/Onfido"},
  {id:"nostalgic",name:"Nostalgic Ambition",kind:"store",sub:"Online store, my own label",status:"Live",url:"https://nostalgicambition.com",host:"nostalgicambition.com",color:["#1c1c1c","#3d3a33"],mark:"NA",
   desc:"A Lagos streetwear label's store built around limited drops: password-gated releases, a polaroid-style product grid, Paystack checkout, order tracking and an admin panel.",stack:"Supabase, Paystack, Resend, Cloudinary, Netlify"},
  {id:"sadora",name:"Sadora Beauty Hub",kind:"site",sub:"Client, beauty studio in Ajah",status:"Live",color:["#e7b7c1","#b0697a"],mark:"Sb",
   desc:"A luxury landing page for a women-only beauty studio, with service packages and booking straight through WhatsApp. Built mobile-first, because that's where her clients find her.",stack:"HTML, CSS, JavaScript, Netlify"},
  {id:"sino",name:"Sino Africa Trading",kind:"site",sub:"Client, trade company in Abuja",status:"Live",url:"https://sinoafrica.netlify.app",host:"sinoafrica.netlify.app",shot:"shots/sino.jpg",
   desc:"A five-page website for a China–Nigeria trade and logistics company, explaining its services and how importing with them works.",stack:"HTML, CSS, JavaScript, Netlify"},
  {id:"dcrclothier",name:"DCR Clothier",kind:"store",sub:"Online store",status:"Live",url:"https://dcrclothier.netlify.app",host:"dcrclothier.netlify.app",shot:"shots/dcrclothier.jpg",
   desc:"A streetwear store with product management and an admin panel for stock and orders.",stack:"Supabase, JavaScript"},
  {id:"olawaleos",name:"OlawaleOS",kind:"site",sub:"This portfolio",status:"Live",url:"https://olawale.nostalgicambition.com",host:"olawale.nostalgicambition.com",color:["#2b385f","#0f1529"],mark:"AO",
   desc:"The site you're using: a desktop in the browser with draggable windows, a WebGL phone, a character-art wallpaper that follows the Lagos sky, three languages and an AI terminal. Hand-written, no framework.",stack:"HTML, CSS, JavaScript, three.js, Claude API, Netlify Functions"}
];
var LAB=[
  {id:"ukbookings",name:"UK vendor bookings",kind:"lab",sub:"Deposit booking platform, South London",status:"Idea",color:["#3d5afe","#1a237e"],mark:"UK",
   desc:"Bookings with deposits for African and Caribbean restaurants and hair and beauty vendors in South London, built on the CityPulse engine. Each vendor sets their own deposit and cancellation rules.",stack:"Expo (web now, iOS and Android later)"},
  {id:"aimodels",name:"AI model agency",kind:"lab",sub:"Virtual models for brands",status:"Idea",color:["#ec407a","#6a1b4d"],mark:"AI",
   desc:"An agency where every model is AI-generated, with consistent identities that brands can license for campaigns and content.",stack:"Image generation"},
  {id:"truckerhub",name:"Trucker Hub",kind:"lab",sub:"Apps for US truck drivers",status:"Idea",color:["#ff9800","#8d4b00"],mark:"TH",
   desc:"A community app for drivers on the road: a nearby room for alerts like accidents or full parking, and a road-buddy room that pairs drivers heading the same way for voice chat.",stack:"Mobile, location-based rooms"}
];
var ALL=PROJECTS.concat(LAB);
var FEATURED=["digitalschool","mayree","afrosteeze","citypulse","foodtalk","altamar","primeautos","stylefinder"];
function proj(id){ for(var i=0;i<ALL.length;i++) if(ALL[i].id===id) return ALL[i]; }
function sys(id){ for(var i=0;i<SYSTEM.length;i++) if(SYSTEM[i].id===id) return SYSTEM[i]; }

/* ================= i18n ================= */
var I18N={
 en:{file:"File",view:"View",lang:"Language",openWork:"Open work folder",wa:"Message me on WhatsApp",email:"Email me",arrange:"Arrange windows",closeall:"Close all windows",restore:"Restore windows",blueprint:"Blueprint mode",
     caption:"full-stack developer, Lagos",hint:"click an icon to open it",homeSub:"Akomolafe Olawale · full-stack developer, Lagos",langs:"I speak Yoruba, English and Mandarin, and I build in all three.",
     lede:"Online stores, booking and ordering systems, mobile apps and startup MVPs, with payments set up and an admin panel you can run yourself. For businesses in Nigeria, the UK and anywhere else.",
     seeWork:"See my work",workTitle:"Things I've built",fAll:"All",fStore:"Online stores",fApp:"Apps and platforms",fSite:"Business websites",fProgress:"In progress",labTitle:"In the lab",labSub:"Ideas I'm exploring next. Not built yet, but open to the right partner.",
     ordersHint:"Tap pay on the customer's phone and watch the order land on the owner's WhatsApp. This is how the ordering sites I build work.",
     spin:"Drag to spin. Tap the phone to switch project.",contactBig:"Tell me what you're building.",contactSub:"Send a message with what your business does and what you need. I usually reply the same day, Lagos time.",
     start:"start",madeIn:"hand-built in Lagos",done:"Done",visit:"Visit site",next:"Next project",requestDemo:"Request a demo",buildTogether:"Build this together",reboot:"Restart OlawaleOS",askBtn:"Ask OlawaleOS",
     sky:{night:"night in Lagos",dawn:"dawn in Lagos",morning:"morning in Lagos",day:"midday in Lagos",golden:"golden hour in Lagos",dusk:"dusk in Lagos"},
     around:"I'm around now. It's {t} in Lagos, so expect a quick reply.",away:"It's {t} in Lagos. Message me and I'll reply first thing in the morning.",
     intro:null},
 yo:{file:"Fáìlì",view:"Wíwò",lang:"Èdè",openWork:"Ṣí àpò iṣẹ́",wa:"Kọ̀wé sí mi lórí WhatsApp",email:"Fi ímeèlì ránṣẹ́",arrange:"Tò àwọn fèrèsé",closeall:"Pa gbogbo fèrèsé",restore:"Dá àwọn fèrèsé padà",blueprint:"Àwòrán ìkọ́lé",
     caption:"olùgbéjáde sọ́fítíwià, Èkó",hint:"tẹ àmì kan láti ṣí i",homeSub:"Akomolafe Olawale · olùgbéjáde sọ́fítíwià, Èkó",langs:"Mo ń sọ Yorùbá, Gẹ̀ẹ́sì àti Ṣáínà, mo sì ń kọ́ ètò ní àwọn èdè mẹ́tẹ̀ẹ̀ta.",
     lede:"Ilé ìtajà orí ayélujára, ètò ìforúkọsílẹ̀ àti ìbéèrè ọjà, áàpù fóònù àti ọjà àkọ́kọ́ fún àwọn ilé-iṣẹ́ tuntun, pẹ̀lú ìsanwó àti ojú-ìṣàkóso tí o lè lò fúnra rẹ. Fún àwọn oníṣòwò ní Nàìjíríà, UK àti níbikíbi.",
     seeWork:"Wo iṣẹ́ mi",workTitle:"Àwọn ohun tí mo ti kọ́",fAll:"Gbogbo",fStore:"Ilé ìtajà",fApp:"Áàpù",fSite:"Ojú òpó oníṣòwò",fProgress:"Èyí tó ń lọ lọ́wọ́",labTitle:"Nínú yàrá àdánwò",labSub:"Àwọn èrò tí mo ń ronú lé lórí. A kò tíì kọ́ wọn.",
     ordersHint:"Tẹ “Pay” lórí fóònù oníbàárà, kí o sì wo bí àṣẹ ṣe ń dé WhatsApp olówó. Báyìí ni àwọn ojú òpó tí mo ń kọ́ ṣe ń ṣiṣẹ́.",
     spin:"Fà á láti yí i. Tẹ fóònù láti yí iṣẹ́ padà.",contactBig:"Sọ ohun tí o fẹ́ kọ́ fún mi.",contactSub:"Kọ̀wé sí mi nípa iṣẹ́ rẹ àti ohun tí o nílò. Mo sábà máa ń fèsì ní ọjọ́ kan náà.",
     start:"bẹ̀rẹ̀",madeIn:"a fi ọwọ́ kọ́ ọ ní Èkó",done:"Ó tán",visit:"Ṣèbẹ̀wò",next:"Iṣẹ́ tó kàn",requestDemo:"Béèrè fún àpẹẹrẹ",buildTogether:"Jẹ́ ká jọ kọ́ ọ",reboot:"Tún OlawaleOS bẹ̀rẹ̀",askBtn:"Bi OlawaleOS léèrè",
     sky:{night:"alẹ́ ní Èkó",dawn:"àfẹ̀mọ́jú ní Èkó",morning:"òwúrọ̀ ní Èkó",day:"ọ̀sán ní Èkó",golden:"ìrọ̀lẹ́ ní Èkó",dusk:"àṣálẹ́ ní Èkó"},
     around:"Mo wà níbí báyìí. Agogo {t} ni ní Èkó, màá fèsì kíákíá.",away:"Agogo {t} ni ní Èkó. Kọ̀wé sí mi, màá fèsì ní òwúrọ̀.",
     intro:"Èmi ni Ọláwálé, olùgbéjáde sọ́fítíwià ní Èkó. Mo ń kọ́ ojú òpó wẹ́ẹ̀bù àti áàpù tí àwọn oníṣòwò ń lò lóòótọ́."},
 zh:{file:"文件",view:"显示",lang:"语言",openWork:"打开作品文件夹",wa:"WhatsApp 联系我",email:"发邮件",arrange:"排列窗口",closeall:"关闭所有窗口",restore:"恢复窗口",blueprint:"蓝图模式",
     caption:"全栈开发者，拉各斯",hint:"点击图标打开",homeSub:"Akomolafe Olawale · 全栈开发者，拉各斯",langs:"我会说约鲁巴语、英语和中文，也能用这三种语言做开发。",
     lede:"网店、预订与点单系统、手机应用和创业产品原型，配好支付功能和可自行管理的后台。服务尼日利亚、英国和世界各地的企业。",
     seeWork:"查看作品",workTitle:"我做过的项目",fAll:"全部",fStore:"网店",fApp:"应用与平台",fSite:"企业网站",fProgress:"进行中",labTitle:"实验室",labSub:"正在构思的下一批想法，尚未开发，欢迎合作。",
     ordersHint:"在顾客手机上点“支付”，看订单如何实时出现在店主的 WhatsApp 上。我做的点单网站就是这样运作的。",
     spin:"拖动旋转，点击手机切换项目。",contactBig:"告诉我你想做什么。",contactSub:"发消息告诉我你的业务和需求。我通常当天回复（拉各斯时间）。",
     start:"开始",madeIn:"拉各斯手工打造",done:"完成",visit:"访问网站",next:"下一个项目",requestDemo:"申请演示",buildTogether:"一起来做",reboot:"重启 OlawaleOS",askBtn:"问问 OlawaleOS",
     sky:{night:"拉各斯 · 夜晚",dawn:"拉各斯 · 黎明",morning:"拉各斯 · 早晨",day:"拉各斯 · 中午",golden:"拉各斯 · 黄昏",dusk:"拉各斯 · 傍晚"},
     around:"我现在在线。拉各斯时间 {t}，很快回复你。",away:"拉各斯现在是 {t}。给我留言，明早第一时间回复。",
     intro:"我是 Olawale，拉各斯的全栈开发者。我打造企业真正会用的网站和应用。"}
};
var lang="en";
try{ var saved=localStorage.getItem("os-lang"); if(saved&&I18N[saved]) lang=saved; }catch(e){}
function t(k){ return (I18N[lang][k]!=null?I18N[lang][k]:I18N.en[k]); }
var INTRO_EN=null;
function applyLang(){
  document.documentElement.lang=lang==="zh"?"zh-Hans":lang;
  $$("[data-i18n]").forEach(function(el){ el.textContent=t(el.getAttribute("data-i18n")); });
  $$(".titlebar .close").forEach(function(b){ b.setAttribute("data-label",t("done")); });
  $$(".drop [data-lang]").forEach(function(b){ b.setAttribute("aria-checked",b.getAttribute("data-lang")===lang?"true":"false"); });
  var intro=$("#intro");
  if(INTRO_EN===null) INTRO_EN=intro.innerHTML;
  if(lang==="en"){ intro.innerHTML=INTRO_EN; } else { intro.textContent=I18N[lang].intro; }
  $$("[data-t=visit]").forEach(function(el){ el.textContent=t("visit"); });
  $$("[data-t=next]").forEach(function(el){ el.textContent=t("next")+" →"; });
  $$("[data-t=requestDemo]").forEach(function(el){ el.textContent=t("requestDemo"); });
  $$("[data-t=buildTogether]").forEach(function(el){ el.textContent=t("buildTogether"); });
  tick();
}

/* ================= icons ================= */
function stClass(st){ return /^Live/.test(st)?"live":(/develop|testing|progress|beta/i.test(st)?"testing":""); }
function isProgress(st){ return /develop|testing|progress|beta|prototype|demo/i.test(st); }
function glyphHTML(item,isProj){
  if(isProj){
    if(item.shot) return '<span class="glyph"><img src="'+item.shot+'" alt="" loading="lazy"></span>';
    return '<span class="glyph" style="background:linear-gradient(135deg,'+item.color[0]+','+item.color[1]+');color:#fff">'+item.mark+'</span>';
  }
  return '<span class="glyph '+item.glyph+'">'+item.text+'</span>';
}
function iconEl(item,isProj){
  var b=document.createElement("button"); b.type="button"; b.className="icon";
  b.setAttribute("data-open", isProj?"p-"+item.id:item.id);
  if(isProj){ b.setAttribute("data-kind",item.kind); if(isProgress(item.status)) b.setAttribute("data-progress","1"); }
  b.innerHTML=glyphHTML(item,isProj)+'<span class="label">'+(isProj?item.name:item.label)+'</span>';
  return b;
}
SYSTEM.forEach(function(s){ $("#icons-left").appendChild(iconEl(s)); });
FEATURED.forEach(function(id){ $("#icons-right").appendChild(iconEl(proj(id),true)); });
PROJECTS.forEach(function(p){ $("#work-grid").appendChild(iconEl(p,true)); });
LAB.forEach(function(p){ $("#lab-grid").appendChild(iconEl(p,true)); });
SYSTEM.forEach(function(s){ if(s.id!=="contact") $("#home-grid").appendChild(iconEl(s)); });
PROJECTS.forEach(function(p){ $("#home-grid").appendChild(iconEl(p,true)); });
(function dock(){
  var d=$("#dock");
  d.innerHTML='<a class="icon" href="https://wa.me/2348109549274" target="_blank" rel="noopener"><span class="glyph app">WA</span><span class="label">WhatsApp</span></a>'+
    '<a class="icon" href="mailto:akomssammy@gmail.com"><span class="glyph mail">@</span><span class="label">Email</span></a>';
  d.appendChild(iconEl(sys("ask"))); d.appendChild(iconEl(sys("about")));
})();

/* ================= project windows ================= */
var pw=$("#project-wins");
ALL.forEach(function(p){
  var group=p.kind==="lab"?LAB:PROJECTS, i=group.indexOf(p), nxt=group[(i+1)%group.length];
  var s=document.createElement("section");
  s.className="win"; s.setAttribute("data-id","p-"+p.id); s.setAttribute("data-w","600"); s.setAttribute("data-bp",(p.host||p.id)+" · project window");
  s.setAttribute("role","dialog"); s.setAttribute("aria-labelledby","t-p-"+p.id);
  var st=stClass(p.status);
  var shot=p.shot?'<img src="'+p.shot+'" alt="'+p.name+' on a phone" loading="lazy">':'<div class="ph" style="background:linear-gradient(160deg,'+p.color[0]+','+p.color[1]+');color:#fff">'+p.name+'</div>';
  s.innerHTML='<div class="titlebar"><button class="close" type="button" aria-label="Close" data-label="Done"></button><span class="title" id="t-p-'+p.id+'">'+(p.host==="demo"?"demos/"+p.id:(p.host||p.id+".project"))+'</span></div>'+
    '<div class="body"><div class="proj"><div class="shot">'+shot+'</div><div>'+
    '<h2>'+p.name+'</h2><p class="muted">'+p.sub+'</p><p style="margin-top:.5rem"><span class="badge '+st+'">'+p.status+'</span></p>'+
    '<p style="margin-top:1rem">'+p.desc+'</p><ul class="kv"><li><span>Built with</span><b>'+p.stack+'</b></li></ul>'+
    '<div class="row">'+(p.url?'<a class="btn primary" href="'+p.url+'" target="_blank" rel="noopener" data-t="visit">Visit site</a>':
      '<a class="btn primary" href="https://wa.me/2348109549274?text='+encodeURIComponent(p.kind==="lab"?"Hi Olawale, I'd like to talk about building "+p.name+" together.":"Hi Olawale, I saw "+p.name+" on your portfolio. Could I see a demo?")+'" target="_blank" rel="noopener" data-t="'+(p.kind==="lab"?"buildTogether":"requestDemo")+'">'+(p.kind==="lab"?"Build this together":"Request a demo")+'</a>')+
    '<button class="btn" type="button" data-open="p-'+nxt.id+'" data-t="next">Next project →</button></div></div></div></div>';
  pw.appendChild(s);
});

/* ================= window manager ================= */
var desktop=$("#desktop"), z=10, cascade=0, positions={};
function win(id){ return $('.win[data-id="'+id+'"]'); }
function vw(){ return window.innerWidth; } function vh(){ return window.innerHeight; }
function barH(){ return $(".menubar").offsetHeight; } function taskH(){ return $(".taskbar").offsetHeight; }
function place(el,id){
  if(isMobile()) return;
  var w=Math.min(parseInt(el.getAttribute("data-w"),10)||480, vw()-24);
  el.style.width=w+"px";
  var p=positions[id];
  if(!p){
    if(id==="about") p={x:Math.max(12,Math.min(130,vw()*0.09)),y:barH()+22};
    else if(id==="phone") p={x:vw()-w-Math.max(12,Math.min(130,vw()*0.09)),y:barH()+30};
    else { p={x:Math.max(12,(vw()-w)/2+cascade*28-40),y:barH()+50+cascade*28}; cascade=(cascade+1)%6; }
  }
  p.x=Math.max(-w+90,Math.min(p.x,vw()-90)); p.y=Math.max(barH()+4,Math.min(p.y,vh()-taskH()-50));
  el.style.left=p.x+"px"; el.style.top=p.y+"px"; positions[id]=p;
}
function front(el){
  z+=1; el.style.zIndex=z;
  $$(".win.front").forEach(function(w){ w.classList.remove("front"); }); el.classList.add("front");
  renderTabs();
}
var historyDepth=0;
function openWin(id){
  var el=win(id); if(!el) return;
  closeMenus();
  if(!el.classList.contains("open")){
    el.classList.add("open"); place(el,id);
    if(isMobile()){ try{ history.pushState({win:id},""); historyDepth++; }catch(e){} }
    if(id==="phone") start3D();
  }
  front(el);
  var c=$(".close",el); if(c&&!isMobile()) c.focus({preventScroll:true});
}
function closeWin(id,fromPop){
  var el=win(id); if(!el||!el.classList.contains("open")) return;
  el.classList.remove("open","front");
  if(id==="phone") phoneActive=false;
  var rest=$$(".win.open").sort(function(a,b){ return (+b.style.zIndex||0)-(+a.style.zIndex||0); });
  if(rest[0]) rest[0].classList.add("front");
  if(isMobile()&&!fromPop&&historyDepth>0){ historyDepth--; suppressPop=true; try{ history.back(); }catch(e){} }
  renderTabs();
}
var suppressPop=false;
window.addEventListener("popstate",function(){
  if(suppressPop){ suppressPop=false; return; }
  var f=$(".win.open.front")||$(".win.open"); if(f){ historyDepth=Math.max(0,historyDepth-1); closeWin(f.getAttribute("data-id"),true); }
});
function renderTabs(){
  var tabs=$("#tabs"); tabs.innerHTML="";
  $$(".win.open").forEach(function(w){
    var b=document.createElement("button"); b.type="button";
    b.textContent=$(".title",w).textContent; if(w.classList.contains("front")) b.className="front";
    b.addEventListener("click",function(){ front(w); }); tabs.appendChild(b);
  });
}
// open via any [data-open]
document.addEventListener("click",function(e){
  var o=e.target.closest("[data-open]"); if(o){ e.preventDefault(); openWin(o.getAttribute("data-open")); closeStart(); return; }
  var c=e.target.closest(".titlebar .close"); if(c){ closeWin(c.closest(".win").getAttribute("data-id")); return; }
});
// focus + drag
$$(".win").forEach(bindWin);
function bindWin(el){
  el.addEventListener("pointerdown",function(){ if(!el.classList.contains("front")) front(el); });
  var tb=$(".titlebar",el), drag=null;
  tb.addEventListener("pointerdown",function(e){
    if(isMobile()||e.target.closest(".close")) return;
    var id=el.getAttribute("data-id"), p=positions[id];
    drag={sx:e.clientX,sy:e.clientY,x:p.x,y:p.y}; tb.setPointerCapture(e.pointerId);
  });
  tb.addEventListener("pointermove",function(e){
    if(!drag) return;
    var id=el.getAttribute("data-id"), w=el.offsetWidth;
    var x=Math.max(-w+90,Math.min(drag.x+e.clientX-drag.sx,vw()-90));
    var y=Math.max(barH()+4,Math.min(drag.y+e.clientY-drag.sy,vh()-taskH()-40));
    positions[id]={x:x,y:y}; el.style.left=x+"px"; el.style.top=y+"px";
  });
  tb.addEventListener("pointerup",function(){ drag=null; });
  tb.addEventListener("dblclick",function(e){ if(e.target.closest(".close")) return; positions[el.getAttribute("data-id")]=null; place(el,el.getAttribute("data-id")); });
}
function arrange(){
  var open=$$(".win.open"); var x=Math.max(12,vw()*0.09), y=barH()+20;
  open.forEach(function(w,i){ positions[w.getAttribute("data-id")]={x:x+i*34,y:y+i*30}; place(w,w.getAttribute("data-id")); front(w); });
}
function restore(){ $$(".win.open").forEach(function(w){ closeWin(w.getAttribute("data-id"),true); }); positions={}; cascade=0; openDefaults(); }
function closeAll(){ $$(".win.open").forEach(function(w){ closeWin(w.getAttribute("data-id"),true); }); }
window.addEventListener("resize",function(){ $$(".win.open").forEach(function(w){ place(w,w.getAttribute("data-id")); }); });

/* ================= menus + start ================= */
function closeMenus(){ $$(".drop.open").forEach(function(d){ d.classList.remove("open"); d.previousElementSibling.setAttribute("aria-expanded","false"); }); }
$$(".menu>button").forEach(function(b){
  b.addEventListener("click",function(e){
    e.stopPropagation(); var d=b.nextElementSibling, was=d.classList.contains("open"); closeMenus(); closeStart();
    if(!was){ d.classList.add("open"); b.setAttribute("aria-expanded","true"); var first=$("button,a",d); if(first) first.focus(); }
  });
  b.addEventListener("mouseenter",function(){ if($(".drop.open")&&!b.nextElementSibling.classList.contains("open")) b.click(); });
});
document.addEventListener("click",function(e){ if(!e.target.closest(".menu")) closeMenus(); if(!e.target.closest("#startmenu,#startbtn")) closeStart(); });
$$("[data-cmd]").forEach(function(b){ b.addEventListener("click",function(){
  var c=b.getAttribute("data-cmd"); closeMenus();
  if(c==="arrange") arrange(); if(c==="closeall") closeAll(); if(c==="restore") restore(); if(c==="blueprint") toggleBP(); if(c==="reboot") boot(true);
}); });
$$("[data-lang]").forEach(function(b){ b.addEventListener("click",function(){ lang=b.getAttribute("data-lang"); try{localStorage.setItem("os-lang",lang);}catch(e){} closeMenus(); applyLang(); }); });
var sm=$("#startmenu"), sb=$("#startbtn");
function closeStart(){ sm.classList.remove("open"); sb.setAttribute("aria-expanded","false"); }
sb.addEventListener("click",function(e){ e.stopPropagation(); var o=!sm.classList.contains("open"); closeMenus(); sm.classList.toggle("open",o); sb.setAttribute("aria-expanded",o?"true":"false"); });

function toggleBP(){ var on=!document.body.classList.contains("bp"); document.body.classList.toggle("bp",on); var b=$('[data-cmd="blueprint"]'); if(b) b.setAttribute("aria-checked",on?"true":"false"); }
document.addEventListener("keydown",function(e){
  var tag=(e.target.tagName||"").toLowerCase(); if(tag==="input"||tag==="textarea"||e.metaKey||e.ctrlKey||e.altKey) return;
  if(e.key==="Escape"){ if($(".drop.open")||sm.classList.contains("open")){ closeMenus(); closeStart(); return; } var f=$(".win.open.front"); if(f) closeWin(f.getAttribute("data-id")); }
  if(e.key==="b"||e.key==="B") toggleBP();
});

/* ================= clocks + availability ================= */
function fmt(tz){ try{ return new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:tz}).format(new Date()); }catch(e){ return "--:--"; } }
function tick(){
  var lag=fmt("Africa/Lagos"); $("#c-lag").textContent=lag; $("#c-ldn").textContent=fmt("Europe/London"); $("#c-nyc").textContent=fmt("America/New_York");
  var h=parseInt(lag.slice(0,2),10), on=h>=8&&h<22, msg=t(on?"around":"away").replace("{t}",lag);
  ["#avail-dot","#avail-dot2"].forEach(function(s){ $(s).classList.toggle("on",on); }); $("#avail-dot").title=msg; $("#avail-text").textContent=msg;
  setSky(h, parseInt(lag.slice(3),10)||0);
}
setInterval(tick,15000);

/* ================= greeting + decode ================= */
var greetings=["Ẹ n lẹ.","Hello.","你好。"], gi=0;
function cycleGreet(){
  gi=(gi+1)%greetings.length;
  var g=$("#greet"); g.classList.add("out");
  setTimeout(function(){ g.textContent=greetings[gi]; g.classList.remove("out"); },400);
  $("#home-greet").textContent=greetings[gi];
}
if(!reduce) setInterval(cycleGreet,2600);
var things=["online stores","booking systems","mobile apps","AI tools","dashboards","ordering sites"], ti=0, glyphs="abcdefghijklmnopqrstuvwxyz#%&*+=<>/";
function decode(target){
  var rot=$("#rot"); if(!rot) return; if(reduce){ rot.textContent=target; return; }
  var len=Math.max(rot.textContent.length,target.length), f=0, total=18;
  var timer=setInterval(function(){
    var out="", rev=Math.floor(f/total*len);
    for(var k=0;k<len;k++){ if(k<rev) out+=target[k]||""; else if(target[k]===" ") out+=" "; else if(k<target.length) out+=glyphs[Math.floor(Math.random()*glyphs.length)]; }
    rot.textContent=out; if(++f>total){ clearInterval(timer); rot.textContent=target; }
  },45);
}
setInterval(function(){ if(lang!=="en") return; ti=(ti+1)%things.length; decode(things[ti]); },3200);

/* ================= work filters ================= */
$$(".filters button").forEach(function(b){ b.addEventListener("click",function(){
  var f=b.getAttribute("data-filter");
  $$(".filters button").forEach(function(x){ x.setAttribute("aria-pressed",x===b?"true":"false"); });
  $$("#work-grid .icon").forEach(function(i){ i.hidden=!(f==="all"||i.getAttribute("data-kind")===f||(f==="progress"&&i.getAttribute("data-progress"))); });
}); });

/* ================= monogram wallpaper ================= */
var cv=$("#mono"), cx=cv.getContext("2d"), cells=[], cw=9, ch=15, mx=-9999, my=-9999, dpr=Math.min(window.devicePixelRatio||1,2), born=performance.now();
var SET="ẸỌṢẹọṣáàéèíìóòúùAOẹọṣ#*+=%@ẸỌ";
var CJK="你好我网站应用拉各斯";
function pick(){ return Math.random()<.1?CJK[Math.floor(Math.random()*CJK.length)]:SET[Math.floor(Math.random()*SET.length)]; }
function buildMono(){
  var W=cv.clientWidth, H=cv.clientHeight; if(!W||!H) return;
  cv.width=W*dpr; cv.height=H*dpr; cx.setTransform(dpr,0,0,dpr,0,0);
  cw=isMobile()?7:9; ch=isMobile()?12:15;
  var off=document.createElement("canvas"); off.width=W; off.height=H; var o=off.getContext("2d");
  var size=Math.min(H*(isMobile()?.78:.62),W*(isMobile()?.62:.42));
  o.fillStyle="#000"; o.font="400 "+size+"px 'Young Serif', Georgia, serif"; o.textAlign="center"; o.textBaseline="middle";
  o.fillText("AO",W/2,H*(isMobile()?.52:.47));
  var data=o.getImageData(0,0,W,H).data; cells=[];
  for(var y=ch/2;y<H;y+=ch){ for(var x=cw/2;x<W;x+=cw){
    var a=data[((Math.floor(y)*W)+Math.floor(x))*4+3];
    if(a>120) cells.push({x:x,y:y,c:pick(),d:Math.random()*900});
    else if(Math.random()<.012) cells.push({x:x,y:y,c:"·",d:Math.random()*900,faint:true});
  } }
}
var lastDraw=0;
function drawMono(now){
  requestAnimationFrame(drawMono);
  if(document.hidden||now-lastDraw<33) return; lastDraw=now;
  var W=cv.clientWidth, H=cv.clientHeight; cx.clearRect(0,0,W,H);
  stepDepth(); cx.save(); cx.translate(-px*18,-py*12);
  cx.font="500 "+(isMobile()?10:13)+"px 'JetBrains Mono', ui-monospace, monospace"; cx.textAlign="center"; cx.textBaseline="middle";
  var tt=now/1000, age=now-born, R=isMobile()?70:120;
  for(var i=0;i<cells.length;i++){
    var c=cells[i]; if(age<c.d&&!reduce) continue;
    if(c.faint){ cx.fillStyle="rgba(163,172,198,.25)"; cx.fillText(c.c,c.x,c.y); continue; }
    var dx=c.x-mx, dy=c.y-my, dist=Math.sqrt(dx*dx+dy*dy), x=c.x, y=c.y, a=.5+.18*Math.sin(tt*1.4+c.x*.03+c.y*.05), col="242,182,50";
    if(!reduce&&Math.random()<.004) c.c=pick();
    if(dist<R){ var k=(R-dist)/R, push=k*k*22; x+=dx/(dist||1)*push; y+=dy/(dist||1)*push; a=.55+.45*k; if(Math.random()<.25) c.c=pick(); if(k>.6) col="238,240,246"; }
    cx.fillStyle="rgba("+col+","+a.toFixed(3)+")"; cx.fillText(c.c,x,y);
  }
  cx.restore();
}
function setPointer(e){ var r=cv.getBoundingClientRect(); mx=e.clientX-r.left+px*18; my=e.clientY-r.top+py*12; }
$(".wall").addEventListener("pointermove",setPointer);
$(".wall").addEventListener("pointerleave",function(){ mx=my=-9999; });
window.addEventListener("resize",function(){ clearTimeout(window._mr); window._mr=setTimeout(buildMono,150); });

/* ================= orders demo ================= */
var MK={ng:{cur:"₦",loc:"en-NG",price:4500,dish:"Party Jollof with Chicken",desc:"Smoky jollof, grilled chicken, fried plantain",place:"Lekki, Lagos",via:"with Paystack",tz:"Africa/Lagos",note:"Paystack confirms the payment, then the order goes straight to WhatsApp."},
        uk:{cur:"£",loc:"en-GB",price:12,dish:"Jollof Rice and Suya",desc:"Jollof rice, beef suya, coleslaw",place:"Peckham, London",via:"with Stripe",tz:"Europe/London",note:"Stripe confirms the payment, then the order goes straight to WhatsApp."}};
var m="ng", qty=1, orders=0, paid={ng:0,uk:0}, orderNo=1042;
function money(v){ return MK[m].cur+Number(v).toLocaleString(MK[m].loc); }
function renderOrder(){
  var k=MK[m]; $("#dish-name").textContent=k.dish; $("#dish-desc").textContent=k.desc; $("#shop-loc").textContent=k.place;
  $("#unit-price").textContent=money(k.price); $("#pay-total").textContent=money(k.price*qty); $("#pay-via").textContent=k.via;
  $("#qty").textContent=qty; $("#flow-note").textContent=k.note; $("#c-orders").textContent=orders; $("#c-paid").textContent=money(paid[m]);
}
$("#plus").addEventListener("click",function(){ if(qty<9){qty++;renderOrder();} });
$("#minus").addEventListener("click",function(){ if(qty>1){qty--;renderOrder();} });
$$(".market button").forEach(function(b){ b.addEventListener("click",function(){ m=b.getAttribute("data-m"); $$(".market button").forEach(function(x){ x.setAttribute("aria-pressed",x===b?"true":"false"); }); renderOrder(); }); });
$("#pay").addEventListener("click",function(){
  var btn=this, k=MK[m], total=k.price*qty, wire=$("#wire");
  btn.disabled=true; btn.firstChild.textContent="Paying ";
  setTimeout(function(){
    btn.firstChild.textContent="Paid ✓ "; wire.classList.remove("go"); void wire.offsetWidth; wire.classList.add("go");
    setTimeout(function(){
      orderNo++; orders++; paid[m]+=total; renderOrder();
      var b=document.createElement("div"); b.className="bubble";
      b.innerHTML="<b>New order #"+orderNo+"</b><br>"+qty+" × "+k.dish+"<br>"+money(total)+" paid "+k.via.replace("with","via")+"<span class='t'>"+fmt(k.tz)+"</span>";
      var body=$("#wa-body"); body.appendChild(b); while(body.children.length>4) body.removeChild(body.firstChild);
      var ph=$("#phone-owner"); if(!reduce){ ph.classList.remove("buzz"); void ph.offsetWidth; ph.classList.add("buzz"); }
      setTimeout(function(){ btn.disabled=false; btn.firstChild.textContent="Pay "; qty=1; renderOrder(); },900);
    },reduce?0:850);
  },600);
});
renderOrder();

/* ================= 3D phone ================= */
var SHOW=["digitalschool","mayree","afrosteeze","omaq","citypulse","altamar","primeautos","isinmi"].map(proj), cur=0, phoneActive=false, three=null;
SHOW.forEach(function(p,i){ var d=document.createElement("button"); d.type="button"; d.setAttribute("aria-label","Show "+p.name); d.addEventListener("click",function(){ goShow(i); }); $("#dots").appendChild(d); });
function caption(){
  var p=SHOW[cur]; $("#show-name").textContent=p.name; $("#show-link").href=p.url; $("#show-link").textContent=t("visit");
  var st=$("#show-status"); st.textContent=p.status; st.className="badge "+stClass(p.status);
  $$("#dots button").forEach(function(d,i){ d.setAttribute("aria-current",i===cur?"true":"false"); }); $("#fb-img").src=p.shot;
}
var goShow=function(i){ cur=(i+SHOW.length)%SHOW.length; caption(); };
caption();
function start3D(){
  phoneActive=true;
  if(three) return;
  if(!window.THREE){ if(!start3D.waiting){ start3D.waiting=true; window.addEventListener("load",function(){ start3D.waiting=false; if(phoneActive) start3D(); },{once:true}); } return; }
  var T=window.THREE, stage=$("#stage");
  try{ var tc=document.createElement("canvas"); if(!(tc.getContext("webgl")||tc.getContext("experimental-webgl"))) return; }catch(e){ return; }
  var W=stage.clientWidth||360, H=stage.clientHeight||420;
  var renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:"low-power"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); renderer.setSize(W,H); renderer.outputEncoding=T.sRGBEncoding;
  stage.appendChild(renderer.domElement); stage.classList.add("webgl");
  var scene=new T.Scene(), camera=new T.PerspectiveCamera(30,W/H,.1,100); camera.position.set(0,0,5.3);
  scene.add(new T.AmbientLight(0xbfc8e6,.55));
  var key=new T.DirectionalLight(0xffffff,1.1); key.position.set(2.5,3,4); scene.add(key);
  var warm=new T.PointLight(0xf2b632,2.2,12); warm.position.set(-2.6,-1.2,2.2); scene.add(warm);
  var rim=new T.PointLight(0x5f7cff,1.6,12); rim.position.set(2.4,1.5,-3); scene.add(rim);
  var phone=new T.Group(); scene.add(phone);
  var PW=1.05, PH=2.16, R=.17, DEPTH=.07, BEV=.035;
  function rounded(w,h,r){ var s=new T.Shape(), x=-w/2, y=-h/2; s.moveTo(x+r,y); s.lineTo(x+w-r,y); s.quadraticCurveTo(x+w,y,x+w,y+r); s.lineTo(x+w,y+h-r); s.quadraticCurveTo(x+w,y+h,x+w-r,y+h); s.lineTo(x+r,y+h); s.quadraticCurveTo(x,y+h,x,y+h-r); s.lineTo(x,y+r); s.quadraticCurveTo(x,y,x+r,y); return s; }
  var bodyGeo=new T.ExtrudeGeometry(rounded(PW-BEV*2,PH-BEV*2,R-BEV),{depth:DEPTH,bevelEnabled:true,bevelThickness:BEV,bevelSize:BEV,bevelSegments:6,curveSegments:18}); bodyGeo.center();
  var bodyMat=new T.MeshStandardMaterial({color:0x10172c,metalness:.75,roughness:.28}); phone.add(new T.Mesh(bodyGeo,bodyMat));
  var FRONT=DEPTH/2+BEV+.0015;
  var btnMat=new T.MeshStandardMaterial({color:0xf2b632,metalness:.5,roughness:.35});
  [[.36,.22],[.12,.14]].forEach(function(b){ var mm=new T.Mesh(new T.BoxGeometry(.03,b[1],.05),btnMat); mm.position.set(PW/2+.005,b[0],0); phone.add(mm); });
  var SW=600, SH=Math.round(600*(PH-.09)/(PW-.09)), sc=document.createElement("canvas"); sc.width=SW; sc.height=SH; var sx=sc.getContext("2d");
  var tex=new T.CanvasTexture(sc); tex.encoding=T.sRGBEncoding; tex.anisotropy=4;
  var scr=new T.Mesh(new T.PlaneGeometry(PW-.09,PH-.09),new T.MeshBasicMaterial({map:tex,transparent:true})); scr.position.z=FRONT; phone.add(scr);
  var glass=new T.Mesh(new T.PlaneGeometry(PW-.09,PH-.09),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.06,metalness:1,roughness:.05})); glass.position.z=FRONT+.001; phone.add(glass);
  function rr(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
  var imgs=SHOW.map(function(p,i){ var im=new Image(); im.onload=function(){ if(i===cur) paint(); }; im.src=p.shot; return im; });
  function paint(){
    var im=imgs[cur]; sx.clearRect(0,0,SW,SH); sx.save(); rr(sx,0,0,SW,SH,64); sx.clip(); sx.fillStyle="#0b1020"; sx.fillRect(0,0,SW,SH);
    if(im.complete&&im.naturalWidth){ var sw=im.naturalWidth, need=sw*SH/SW, sh=Math.min(im.naturalHeight,need); sx.drawImage(im,0,0,sw,sh,0,0,SW,SH*(sh/need)); }
    var g=sx.createLinearGradient(0,0,0,90); g.addColorStop(0,"rgba(0,0,0,.45)"); g.addColorStop(1,"rgba(0,0,0,0)"); sx.fillStyle=g; sx.fillRect(0,0,SW,90);
    sx.fillStyle="#000"; rr(sx,SW/2-90,22,180,46,23); sx.fill();
    sx.fillStyle="#fff"; sx.font="600 26px 'Hanken Grotesk', system-ui, sans-serif"; sx.textBaseline="middle"; sx.fillText(fmt("Africa/Lagos"),46,46);
    sx.restore(); tex.needsUpdate=true;
  }
  paint();
  var bc=document.createElement("canvas"); bc.width=512; bc.height=1024; var bx=bc.getContext("2d");
  var bg=bx.createLinearGradient(0,0,512,1024); bg.addColorStop(0,"#1c2748"); bg.addColorStop(1,"#0e1428"); bx.fillStyle=bg; bx.fillRect(0,0,512,1024);
  bx.fillStyle="#f2b632"; bx.font="400 150px 'Young Serif', Georgia, serif"; bx.textAlign="center"; bx.textBaseline="middle"; bx.fillText("AO",256,560);
  bx.fillStyle="#a3acc6"; bx.font="500 30px 'Hanken Grotesk', system-ui, sans-serif"; bx.fillText("Built in Lagos",256,680);
  var btex=new T.CanvasTexture(bc); btex.encoding=T.sRGBEncoding;
  var back=new T.Mesh(new T.PlaneGeometry(PW-.09,PH-.09),new T.MeshStandardMaterial({map:btex,metalness:.4,roughness:.45})); back.position.z=-FRONT; back.rotation.y=Math.PI; phone.add(back);
  var bump=new T.Mesh(new T.ExtrudeGeometry(rounded(.42,.42,.1),{depth:.03,bevelEnabled:true,bevelThickness:.01,bevelSize:.01,bevelSegments:3}),bodyMat); bump.position.set(PW/2-.33,PH/2-.33,-FRONT-.035); phone.add(bump);
  var lensMat=new T.MeshStandardMaterial({color:0x05070d,metalness:.9,roughness:.1});
  [[-.09,.09],[.09,-.09]].forEach(function(o){ var l=new T.Mesh(new T.CylinderGeometry(.065,.065,.03,28),lensMat); l.rotation.x=Math.PI/2; l.position.set(PW/2-.33+o[0],PH/2-.33+o[1],-FRONT-.05); phone.add(l); });

  var rotY=-.35, rotX=.05, velY=0, dragging=false, lx=0, ly=0, dx0=0, dt0=0, lastIn=0, flip=null, nextAuto=performance.now()+5500;
  goShow=function(i){ i=(i+SHOW.length)%SHOW.length; if(i===cur||flip) return; flip={from:rotY,start:performance.now(),dur:reduce?1:900,to:i,sw:false}; lastIn=performance.now(); };
  var el=renderer.domElement;
  el.addEventListener("pointerdown",function(e){ dragging=true; lx=dx0=e.clientX; ly=e.clientY; dt0=performance.now(); velY=0; lastIn=dt0; el.setPointerCapture(e.pointerId); });
  el.addEventListener("pointermove",function(e){ if(!dragging) return; var dx=e.clientX-lx, dy=e.clientY-ly; lx=e.clientX; ly=e.clientY; rotY+=dx*.012; velY=dx*.012; rotX=Math.max(-.45,Math.min(.45,rotX+dy*.006)); lastIn=performance.now(); });
  function up(e){ if(!dragging) return; dragging=false; if(Math.abs(e.clientX-dx0)<6&&performance.now()-dt0<350) goShow(cur+1); lastIn=performance.now(); nextAuto=lastIn+7000; }
  el.addEventListener("pointerup",up); el.addEventListener("pointercancel",up);
  if("ResizeObserver" in window) new ResizeObserver(function(){ var w=stage.clientWidth, h=stage.clientHeight; if(!w||!h) return; renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix(); }).observe(stage);
  function ease(k){ return k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2; }
  var lastPaint=0;
  function frame(now){
    requestAnimationFrame(frame); if(!phoneActive||document.hidden) return;
    var tt=now/1000;
    if(flip){ var k=Math.min(1,(now-flip.start)/flip.dur); rotY=flip.from+ease(k)*Math.PI*2; if(!flip.sw&&k>=.5){ cur=flip.to; caption(); paint(); flip.sw=true; } if(k>=1){ rotY=flip.from; flip=null; nextAuto=now+5500; } }
    else if(!dragging){ rotY+=velY; velY*=.92; if(now-lastIn>2500&&!reduce){ rotY+=((-.35+Math.sin(tt*.55)*.42)-rotY)*.02; rotX+=((.05+Math.sin(tt*.4)*.07)-rotX)*.03; if(now>nextAuto) goShow(cur+1); } }
    phone.rotation.y=rotY; phone.rotation.x=rotX; phone.position.y=reduce?0:Math.sin(tt*1.1)*.05;
    if(now-lastPaint>30000){ paint(); lastPaint=now; }
    renderer.render(scene,camera);
  }
  requestAnimationFrame(frame);
  three=true;
}

/* ================= sky: desktop follows Lagos time ================= */
var skyOverride=(location.search.match(/[?&]sky=(\w+)/)||[])[1], skyNow="";
var SKY_ICON={night:"☾",dawn:"◐",morning:"☼",day:"☀",golden:"◑",dusk:"☾"};
function setSky(h,mn){
  var t2=h+mn/60, ph=t2<5?"night":t2<7?"dawn":t2<11?"morning":t2<16?"day":t2<18.5?"golden":t2<20?"dusk":"night";
  if(skyOverride&&SKY_ICON[skyOverride]) ph=skyOverride;
  if(ph!==skyNow){ document.body.classList.remove("sky-"+skyNow); document.body.classList.add("sky-"+ph); skyNow=ph; }
  var lab=(I18N[lang].sky||I18N.en.sky)[ph]; $("#sky-label").textContent=SKY_ICON[ph]+" "+lab;
}

/* ================= depth: mouse + gyroscope parallax ================= */
var px=0, py=0, tx=0, ty=0;
function stepDepth(){
  if(reduce){ px=py=0; return; }
  px+=(tx-px)*.08; py+=(ty-py)*.08;
  var t=" translate("+(-px*6).toFixed(2)+"px,"+(-py*4).toFixed(2)+"px)";
  $$(".icons").forEach(function(el){ el.style.transform=t; });
  var home=$("#home"); if(home) home.style.transform="translate("+(-px*8).toFixed(2)+"px,"+(-py*6).toFixed(2)+"px)";
  var wall=$(".wall"); if(wall) wall.style.backgroundPosition=(-px*10).toFixed(1)+"px "+(-py*8).toFixed(1)+"px, 0 0";
}
window.addEventListener("pointermove",function(e){ if(e.pointerType==="mouse"){ tx=(e.clientX/vw()-.5)*2; ty=(e.clientY/vh()-.5)*2; } });
function onTilt(e){ if(e.gamma==null) return; tx=Math.max(-1,Math.min(1,e.gamma/25)); ty=Math.max(-1,Math.min(1,(e.beta-45)/25)); }
var tiltAsked=false;
function enableTilt(){
  if(tiltAsked) return; tiltAsked=true;
  var D=window.DeviceOrientationEvent;
  if(D&&typeof D.requestPermission==="function"){ D.requestPermission().then(function(r){ if(r==="granted") window.addEventListener("deviceorientation",onTilt); }).catch(function(){}); }
  else if(D) window.addEventListener("deviceorientation",onTilt);
}
if(!(window.DeviceOrientationEvent&&typeof DeviceOrientationEvent.requestPermission==="function")) enableTilt();
else document.addEventListener("touchend",enableTilt,{once:true});

/* ================= Ask OlawaleOS terminal ================= */
var out=$("#term-out"), form=$("#term-form"), input=$("#term-input"), chat=[], busy=false, termStarted=false;
var CHIPS=["I run a restaurant in London","How much for an online store?","Can you build a mobile app?","What has he built?","Ẹ n lẹ, ṣé o lè ràn mí lọ́wọ́?","你会说中文吗？"];
function line(text,cls){ var p=document.createElement("p"); p.className=cls||""; p.textContent=text; out.appendChild(p); out.scrollTop=out.scrollHeight; return p; }
function typeLine(text,cls,done){
  var p=line("",cls); if(reduce){ p.textContent=text; out.scrollTop=out.scrollHeight; if(done) done(); return; }
  var i=0, cur=document.createElement("span"); cur.className="cursor"; p.appendChild(cur);
  (function step(){ i=Math.min(text.length,i+3); p.textContent=text.slice(0,i); p.appendChild(cur); out.scrollTop=out.scrollHeight;
    if(i<text.length) setTimeout(step,12); else { cur.remove(); if(done) done(); } })();
}
function linkLine(html){ var p=document.createElement("p"); p.className="a"; p.innerHTML=html; out.appendChild(p); out.scrollTop=out.scrollHeight; }
function termIntro(){
  if(termStarted) return; termStarted=true;
  line("OlawaleOS terminal v1.0, powered by Claude","sys");
  line("Ask me what Olawale can build for you, in English, Yorùbá or 中文. Type help for commands.","sys");
  var ch=$("#term-chips"); CHIPS.forEach(function(c){ var b=document.createElement("button"); b.type="button"; b.textContent=c; b.addEventListener("click",function(){ submit(c); }); ch.appendChild(b); });
}
function openFromAnswer(ids){
  if(isMobile()){ (ids||[]).forEach(function(id){ if(!win(id)) return; var b=document.createElement("button"); b.type="button"; b.className="openlink"; b.setAttribute("data-open",id); b.textContent="→ open "+$(".title",win(id)).textContent; var p=document.createElement("p"); p.appendChild(b); out.appendChild(p); out.scrollTop=out.scrollHeight; }); return; }
  (ids||[]).forEach(function(id,k){ if(win(id)) setTimeout(function(){ openWin(id); line("→ opened "+$(".title",win(id)).textContent,"opened"); var a=win("ask"); if(a&&!isMobile()) front(a); },500+k*350); });
}
function cta(){ linkLine('→ <a href="https://wa.me/2348109549274" target="_blank" rel="noopener">Message Olawale on WhatsApp</a> · <a href="mailto:akomssammy@gmail.com">akomssammy@gmail.com</a>'); }
function localCommand(q){
  var c=q.trim().toLowerCase(), parts=c.split(/\s+/);
  if(c==="help"){ line("commands: ls · open <project> · whoami · contact · clear · lang yo|en|zh · or just ask a question","sys"); return true; }
  if(c==="clear"){ out.innerHTML=""; return true; }
  if(c==="ls"||c==="ls work"){ line(PROJECTS.map(function(p){ return p.id; }).join("   "),"a"); return true; }
  if(c==="whoami"){ line("Akomolafe Olawale · full-stack developer · Lagos · English, Yorùbá, 中文","a"); openWin("about"); return true; }
  if(c==="contact"){ cta(); return true; }
  if(parts[0]==="lang"&&I18N[parts[1]]){ lang=parts[1]; try{localStorage.setItem("os-lang",lang);}catch(e){} applyLang(); line("language: "+parts[1],"sys"); return true; }
  if(parts[0]==="open"&&parts[1]){ var target=parts.slice(1).join(" "), hit=PROJECTS.filter(function(p){ return p.id.indexOf(target)===0||p.name.toLowerCase().indexOf(target)===0; })[0];
    var id=hit?"p-"+hit.id:(win(target)?target:null); if(id){ openWin(id); line("→ opened "+$(".title",win(id)).textContent,"opened"); } else line("not found: "+target+" (try ls)","sys"); return true; }
  return false;
}
// offline answers, used when the AI isn't configured or unreachable
function offline(q){
  var s=q.toLowerCase(), has=function(re){ return re.test(s); };
  if(has(/price|cost|how much|budget|quote|₦|naira|£|\$|fee|charge/)) return {reply:"Every project is quoted on scope after a short chat, so you only pay for what your business needs. Tell Olawale what you sell and what customers should be able to do, and he'll send a quote, usually the same day.",open:["services"],cta:true};
  if(has(/restaurant|food|kitchen|cater|order|menu|delivery/)) return {reply:"For restaurants, Olawale builds ordering sites where customers pay online and every order lands on your WhatsApp instantly. Try the live demo, see OMAQ Foods, and look at FoodTalk, his food discovery app in development.",open:["orders","p-omaq","p-foodtalk"],cta:true};
  if(has(/salon|beauty|book|appointment|studio|spa|barber/)) return {reply:"He builds booking sites with your services, prices and WhatsApp booking built in, mobile-first because that's where your clients are. Sadora Beauty Hub in Ajah is a good example.",open:["p-sadora"],cta:false};
  if(has(/app|mobile|android|ios|startup|mvp|saas|platform/)) return {reply:"Yes. He builds Android and iOS apps and startup MVPs end to end, from database to Play Store. CityPulse NG is his Lagos city app, and Eirlyn is an MVP for the US and UK market.",open:["p-citypulse","p-eirlyn"],cta:false};
  if(has(/\bai\b|artificial|chatbot|gpt|claude/)) return {reply:"He builds AI features into real products. FitCheck is his AI stylist, and this terminal you're typing in is one too.",open:["p-fitcheck"],cta:false};
  if(has(/china|chinese|import|mandarin|中文|你/)) return {reply:"Olawale speaks Mandarin and studied in China. He built the website for Sino Africa, a China–Nigeria trade company. 他会说中文，欢迎用中文联系他。",open:["p-sino"],cta:true};
  if(has(/ẹ|ọ|ṣ|yoruba|yorùbá|bawo|e kaa/)) return {reply:"Bẹ́ẹ̀ni! Olawale ń sọ Yorùbá. Ó ń kọ́ ojú òpó wẹ́ẹ̀bù, ilé ìtajà orí ayélujára àti áàpù fún àwọn oníṣòwò. Kọ̀wé sí i lórí WhatsApp.",open:["about"],cta:true};
  if(has(/school|course|learn|teach|education|certificate|academy/)) return {reply:"Olawale built a full online school: subscriptions, courses, graded tasks, verifiable certificates and an admin course builder. It's live in beta as Digital School.",open:["p-digitalschool"],cta:false};
  if(has(/hair|braid|wig|stylist/)) return {reply:"For hair and beauty businesses he builds booking sites with a product shop and fixed time slots, so a stylist can never be double-booked. Adunni Hair Studio is in progress, and Sadora Beauty Hub is live.",open:["p-adunni","p-sadora"],cta:false};
  if(has(/car|dealer|auto|vehicle/)) return {reply:"For car dealers he builds sites showing every car with real photos, mileage and price, with filters and one-tap WhatsApp. Prime Autos Lagos is the demo.",open:["p-primeautos"],cta:true};
  if(has(/short.?let|apartment|airbnb|hotel|stay|property|real estate/)) return {reply:"For short-let hosts he builds booking sites where guests pick dates, see the real price and book straight with you on WhatsApp. Isinmi Stays is the demo.",open:["p-isinmi"],cta:true};
  if(has(/tour|boat|sail|travel|charter|spanish|mexico/)) return {reply:"He builds tourism and booking sites too, in more than one language. Altamar Privé is a sailing charter site in Mexico with an English and Spanish switch.",open:["p-altamar"],cta:false};
  if(has(/bank|fintech|finance|payment app|money/)) return {reply:"He's currently building the customer web app for a US banking client, and he has built payments into almost every project with Paystack and Stripe.",open:["p-bankapp"],cta:false};
  if(has(/idea|lab|next|future|partner/)) return {reply:"Here's his lab: ideas he's exploring next, open to the right partner.",open:["lab"],cta:true};
  if(has(/store|shop|ecommerce|e-commerce|sell|fashion|cloth|bag|product/)) return {reply:"Online stores are his speciality: product pages, Paystack or Stripe checkout, and an admin panel you run yourself. Look at Mayree, a luxury handbag store, and AFRO STEEZE, a 20+ page fashion store.",open:["p-mayree","p-afrosteeze"],cta:false};
  if(has(/uk|london|england|britain|stripe|usa|america/)) return {reply:"He works with UK and US clients remotely and overlaps fully with UK hours from Lagos. Payments run on Stripe, and OMAQ Foods is a UK client site.",open:["p-omaq"],cta:false};
  if(has(/how long|time|fast|deadline|when/)) return {reply:"It depends on scope, but you see a working preview early rather than waiting for the end. Share what you need and he'll give you a timeline with the quote.",open:["services"],cta:true};
  if(has(/who|about|background|experience/)) return {reply:"Olawale is a full-stack developer in Lagos who studied in China and worked as a retained developer there. He builds stores, booking systems, apps and AI tools, and runs his own ventures.",open:["story"],cta:false};
  if(has(/work|built|portfolio|project|example/)) return {reply:"Here's his work folder: online stores, apps and business websites for clients in Nigeria, the UK and beyond.",open:["work"],cta:false};
  if(has(/hire|contact|whatsapp|email|talk|start/)) return {reply:"The fastest way is WhatsApp. Tell him what your business does and what you need.",open:["contact"],cta:true};
  return {reply:"I can tell you what Olawale builds, show you examples, or help you start a project. Try asking about online stores, apps, restaurants, booking sites or pricing.",open:[],cta:false};
}
function answer(res){
  chat.push({role:"assistant",content:res.reply});
  typeLine(res.reply,"a",function(){ openFromAnswer(res.open); if(res.cta) setTimeout(cta,(res.open||[]).length*350+600); busy=false; input.disabled=false; if(!isMobile()) input.focus(); });
}
function submit(q){
  q=(q||"").trim(); if(!q||busy) return; input.value=""; line(q,"u");
  if(localCommand(q)) return;
  busy=true; input.disabled=true; chat.push({role:"user",content:q.slice(0,600)});
  var think=line("thinking…","sys");
  fetch("/.netlify/functions/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:chat.slice(-8)})})
    .then(function(r){ return r.ok?r.json():Promise.reject(r.status); })
    .then(function(d){ think.remove(); if(!d||!d.reply) throw 0; answer(d); })
    .catch(function(){ think.remove(); answer(offline(q)); });
}
form.addEventListener("submit",function(e){ e.preventDefault(); submit(input.value); });
var _open=openWin;
openWin=function(id){ _open(id); if(id==="ask"){ termIntro(); if(!isMobile()) setTimeout(function(){ input.focus(); },60); } };

/* ================= boot sequence ================= */
function boot(force){
  if(document.getElementById("boot")) return;
  var LINES=[["OlawaleOS v1.0 · Lagos, Nigeria",""],["checking memory ............ ","ok"],["loading fonts ............... ","ok"],["mounting /work ("+PROJECTS.length+" projects) ... ","ok"],["mounting /lab ("+LAB.length+" ideas) ...... ","ok"],
    ["loading Paystack drivers ..... ","ok"],["loading Stripe drivers ....... ","ok"],["connecting to WhatsApp ....... ","ok"],["syncing clocks: LAG LDN NYC .. ","ok"],["languages: Yorùbá · English · 中文 ","ok"],["starting desktop",""]];
  var el=document.createElement("div"); el.id="boot"; el.setAttribute("role","status"); el.setAttribute("aria-label","OlawaleOS is starting");
  el.innerHTML='<div class="mark">AO</div><div class="log"></div><div class="bar"><i></i></div><div class="skip">tap or press any key to skip</div>';
  document.body.appendChild(el);
  var log=$(".log",el), bar=$(".bar i",el), i=0, finished=false;
  function finish(){ if(finished) return; finished=true; born=performance.now(); el.classList.add("done"); setTimeout(function(){ el.remove(); },500); document.removeEventListener("keydown",finish); }
  if(reduce){ LINES.forEach(function(L){ var p=document.createElement("p"); p.textContent=L[0]+(L[1]?"[ ok ]":""); log.appendChild(p); }); bar.style.width="100%"; setTimeout(finish,900); }
  else (function next(){
    if(finished) return;
    if(i>=LINES.length){ setTimeout(finish,250); return; }
    var L=LINES[i++], p=document.createElement("p"); p.textContent=L[0];
    if(L[1]){ var s2=document.createElement("span"); s2.className="ok"; s2.textContent="[ ok ]"; p.appendChild(s2); }
    log.appendChild(p); bar.style.width=Math.round(i/LINES.length*100)+"%";
    setTimeout(next,i===1?320:150+Math.random()*90);
  })();
  el.addEventListener("click",finish); document.addEventListener("keydown",finish);
}

/* ================= boot ================= */
function openDefaults(){
  if(isMobile()) return;
  openWin("phone"); openWin("about");
}
$("#year").textContent=new Date().getFullYear();
applyLang();
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){ buildMono(); requestAnimationFrame(drawMono); });
boot(false);
openDefaults();
try{
  console.log("%cẸ n lẹ, fellow developer.","font:600 16px Georgia;color:#f2b632");
  console.log("OlawaleOS: hand-written HTML, CSS and JS. No framework, no template.\nPress B for the blueprint. Want to build something? akomssammy@gmail.com");
}catch(e){}
})();
