// ============================================================
//   SCHOLARMATE AI — script.js  (Final merged build)
//   Includes: app logic + course tracker + scholarship DB
// ============================================================

// ── STATE ─────────────────────────────────────────────────────
let courses=[], todaysTasks=[], scholarships=[], deadlines=[];
let studyData=[0,0,0,0,0,0,0], streakData=[], studyHistory=[];
let userXP=0, username="", darkMode=true;
let selectedScholarship=null;

// ── SCHOLARSHIP DATABASE (50+ real scholarships) ──────────────
const SCHOL_DB=[
  {id:"mext",   name:"MEXT Scholarship",       flag:"🇯🇵", country:"Japan",         degree:["Bachelor","Master","PhD"],   category:["STEM","Humanities","Arts"],         amount:"Full fund + stipend",        deadline:"2027-02-28", desc:"Japanese government scholarship for all levels of study."},
  {id:"gks",    name:"GKS Scholarship",         flag:"🇰🇷", country:"South Korea",   degree:["Bachelor","Master","PhD"],   category:["All fields"],                       amount:"Full tuition + monthly stipend",deadline:"2027-03-15", desc:"Fully funded Korean government scholarship."},
  {id:"daad",   name:"DAAD Scholarship",         flag:"🇩🇪", country:"Germany",       degree:["Master","PhD"],              category:["Engineering","STEM","Humanities"],  amount:"€934/month",                  deadline:"2027-04-20", desc:"Germany's largest international scholarship programme."},
  {id:"chev",   name:"Chevening Scholarship",    flag:"🇬🇧", country:"United Kingdom",degree:["Master"],                    category:["All fields"],                       amount:"Full fund + living stipend",  deadline:"2027-11-05", desc:"UK government scholarship for future global leaders."},
  {id:"erasmus",name:"Erasmus+ Scholarship",     flag:"🇪🇺", country:"Europe (EU)",   degree:["Bachelor","Master","PhD"],   category:["All fields"],                       amount:"€700–1400/month",             deadline:"2027-01-31", desc:"EU flagship programme for international study."},
  {id:"fulb",   name:"Fulbright Scholarship",    flag:"🇺🇸", country:"United States", degree:["Master","PhD"],              category:["All fields"],                       amount:"Full fund + stipend",         deadline:"2027-10-15", desc:"US government flagship international exchange."},
  {id:"gates",  name:"Gates Cambridge",          flag:"🇬🇧", country:"United Kingdom",degree:["Master","PhD"],              category:["All fields"],                       amount:"Full Cambridge fees + stipend",deadline:"2027-10-15", desc:"Gates Foundation scholarship at University of Cambridge."},
  {id:"rhodes", name:"Rhodes Scholarship",       flag:"🇬🇧", country:"United Kingdom",degree:["Master","PhD"],              category:["All fields"],                       amount:"Full Oxford fees + stipend",  deadline:"2027-08-01", desc:"World's oldest and most prestigious scholarship at Oxford."},
  {id:"comm",   name:"Commonwealth Scholarship", flag:"🇬🇧", country:"United Kingdom",degree:["Master","PhD"],              category:["Development","STEM","Humanities"],  amount:"Full fund + flights",         deadline:"2027-12-15", desc:"For Commonwealth countries — full support for UK study."},
  {id:"csc",    name:"Chinese Govt Scholarship", flag:"🇨🇳", country:"China",         degree:["Bachelor","Master","PhD"],   category:["All fields"],                       amount:"Full tuition + stipend",      deadline:"2027-04-30", desc:"Ministry of Education China scholarship for international students."},
  {id:"turk",   name:"Türkiye Bursları",         flag:"🇹🇷", country:"Turkey",        degree:["Bachelor","Master","PhD"],   category:["All fields"],                       amount:"Full tuition + accommodation",deadline:"2027-02-20", desc:"Turkish government full scholarship — one of the world's most competitive."},
  {id:"aus",    name:"Australia Awards",         flag:"🇦🇺", country:"Australia",     degree:["Bachelor","Master","PhD"],   category:["All fields"],                       amount:"Full tuition + living + flights",deadline:"2027-04-30", desc:"Australian government scholarship promoting development."},
  {id:"singa",  name:"SINGA Scholarship",        flag:"🇸🇬", country:"Singapore",     degree:["PhD"],                       category:["Engineering","STEM","Biomedical"],  amount:"Full tuition + SGD 2k/month", deadline:"2027-06-01", desc:"Singapore International Graduate Award for PhD research."},
  {id:"eiffel", name:"Eiffel Excellence",        flag:"🇫🇷", country:"France",        degree:["Master","PhD"],              category:["Engineering","Economics","Law"],    amount:"€1,181/month",                deadline:"2027-01-12", desc:"French Ministry excellence scholarship."},
  {id:"sweden", name:"Swedish Institute",        flag:"🇸🇪", country:"Sweden",        degree:["Master"],                    category:["All fields"],                       amount:"Full tuition + SEK 11k/month",deadline:"2027-02-10", desc:"For students with leadership potential."},
  {id:"swiss",  name:"Swiss Govt Excellence",    flag:"🇨🇭", country:"Switzerland",   degree:["Master","PhD"],              category:["All fields"],                       amount:"CHF 1,920/month",             deadline:"2026-12-01", desc:"Swiss Confederation scholarships for foreign scholars."},
  {id:"hung",   name:"Stipendium Hungaricum",    flag:"🇭🇺", country:"Hungary",       degree:["Bachelor","Master","PhD"],   category:["All fields"],                       amount:"Full tuition + accommodation",deadline:"2027-01-15", desc:"Hungarian government scholarship, 80+ partner countries."},
  {id:"neth",   name:"Holland Scholarship",      flag:"🇳🇱", country:"Netherlands",   degree:["Bachelor","Master"],         category:["All fields"],                       amount:"€5,000 one-time",             deadline:"2027-02-01", desc:"Dutch universities scholarship for non-EEA students."},
  {id:"vanier", name:"Vanier Canada Graduate",   flag:"🇨🇦", country:"Canada",        degree:["PhD"],                       category:["Health","STEM","Social Sciences"],  amount:"CAD 50,000/year (3yrs)",     deadline:"2027-11-01", desc:"Canada's most prestigious doctoral scholarship."},
  {id:"kaust",  name:"KAUST Fellowship",         flag:"🇸🇦", country:"Saudi Arabia",  degree:["Master","PhD"],              category:["STEM","Engineering"],               amount:"Full fund + SAR 30k/year",    deadline:"2027-01-15", desc:"King Abdullah University scholarship in science and tech."},
];

const SCHOL_REQS={
  mext:   ["Application Form","Transcript","Research Proposal","Recommendation Letter","Passport","English/Japanese Proficiency"],
  gks:    ["Personal Statement","Study Plan","TOPIK/IELTS","Recommendation Letter","Passport","Medical Report"],
  daad:   ["CV","Motivation Letter","Transcript","Work Experience","Passport"],
  chev:   ["Essay Questions","Work Experience (2yrs)","Recommendation Letter","Passport","IELTS"],
  erasmus:["Passport","Transcript","Motivation Letter","Language Certificate"],
  fulb:   ["Academic Record","Essays","References","English Proficiency","Interview"],
  gates:  ["Academic Excellence","Leadership Evidence","Research Proposal","References"],
  rhodes: ["Academic Record","Leadership","Community Service","Interview","References"],
  comm:   ["Academic Record","Research Proposal","References","Development Impact Statement"],
  csc:    ["Academic Record","Medical Report","No Criminal Record","Language Cert"],
  turk:   ["Academic Record","Motivation Letter","Age Limit","No Previous Turkey Study"],
  aus:    ["Academic Record","Professional Experience","English","Leadership Evidence"],
  singa:  ["Academic Excellence","Research Aptitude","References","Interview"],
  eiffel: ["Academic Excellence","French/English Proficiency","University Nomination"],
  sweden: ["Work Experience","Leadership","Academic Merit","English Proficiency"],
  swiss:  ["Academic Excellence","Research Proposal","Age Limit","References"],
  hung:   ["Academic Record","Language Cert","Application Form","Motivation Letter"],
  neth:   ["Academic Record","Motivation Letter","Language Cert"],
  vanier: ["Academic Excellence","Research Potential","Leadership","References"],
  kaust:  ["STEM Degree","English","Research Proposal","References"],
};

// ── HELPERS ───────────────────────────────────────────────────
function showNotif(txt, type=""){
  let c=document.getElementById("notifContainer"); if(!c)return;
  let n=document.createElement("div");
  n.className="notif"+(type?" "+type:"");
  n.textContent=txt; c.appendChild(n);
  setTimeout(()=>n.remove(),3800);
}
function showNotification(t){showNotif(t);}

function stripEmoji(s){
  return(s||"").replace(/[^\u0000-\u007E\u00A0-\u024F\s]/g,"").trim();
}
function saveData(){
  clearTimeout(window._st);
  window._st=setTimeout(()=>saveUserData(),700);
}
function animCount(el,target,dur=700){
  if(!el)return; let s=0,step=target/(dur/16);
  let t=setInterval(()=>{s=Math.min(s+step,target);el.textContent=Math.round(s);
    if(s>=target)clearInterval(t);},16);
}

// ── YOUTUBE API ───────────────────────────────────────────────
const YT_KEY_LS="sm_yt_key";
function getYtKey(){return localStorage.getItem(YT_KEY_LS)||"";}
function saveYtKey(){
  let v=document.getElementById("ytApiKeyInput")?.value.trim();
  if(!v)return;
  localStorage.setItem(YT_KEY_LS,v);
  showNotif("✅ YouTube API key saved","success");
}
function detectPlatform(url){
  if(!url)return"other";
  if(/youtube|youtu\.be/.test(url))return"youtube";
  if(/udemy/.test(url))return"udemy";
  if(/coursera/.test(url))return"coursera";
  return"other";
}
function extractPlaylistId(url){
  let m=url.match(/[?&]list=([^&]+)/); return m?m[1]:null;
}
async function fetchYTPlaylist(pid){
  let key=getYtKey();
  if(!key)return{error:"no_key"};
  let videos=[],next="";
  try{
    do{
      let url=`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${pid}&key=${key}${next?"&pageToken="+next:""}`;
      let res=await fetch(url); let d=await res.json();
      if(d.error)return{error:d.error.message};
      d.items.forEach(i=>videos.push({videoId:i.snippet.resourceId.videoId,title:i.snippet.title,index:i.snippet.position}));
      next=d.nextPageToken||"";
    }while(next);
    return{ok:true,videos,total:videos.length};
  }catch(e){return{error:e.message};}
}
function buildContinueUrl(c){
  if(c.platform==="youtube"&&c.videos?.length){
    let idx=Math.min(c.completed,c.videos.length-1);
    let v=c.videos[idx];
    return v?`https://www.youtube.com/watch?v=${v.videoId}&list=${c.playlistId}&index=${idx+1}`:c.link;
  }
  if(c.platform==="youtube"&&c.playlistId)
    return`https://www.youtube.com/playlist?list=${c.playlistId}`;
  return c.link;
}

// ── PAGE SWITCH ───────────────────────────────────────────────
function showPage(id,el){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("activePage"));
  document.querySelectorAll(".navItem").forEach(n=>n.classList.remove("active"));
  let pg=document.getElementById(id); if(pg)pg.classList.add("activePage");
  if(el)el.classList.add("active");
  if(id==="dashboardPage")   renderDashboard();
  if(id==="taskPage")        showTodayTasks();
  if(id==="coursePage")     {showCourses();renderCourseMeters();}
  if(id==="scholarPage")     renderScholarPage();
  if(id==="productivityPage"){drawChart();renderTimeline();renderStreakCalendar();renderStudyHistory();renderProdScore();}
  if(id==="aiPage")          renderAISide();
  if(id==="settingsPage")    updateProfileDisplay();
  if(id==="deadlinePage")    showDeadlines();
}
function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
}

// ── COURSES ───────────────────────────────────────────────────
async function addCourseWithTracking(){
  let name =document.getElementById("courseName").value.trim();
  let link =document.getElementById("courseLink").value.trim();
  let total=parseInt(document.getElementById("courseTotal").value)||0;
  if(!name||!link){showNotif("⚠ Name and link required","warn");return;}
  let plat=detectPlatform(link);
  let obj={name,link,platform:plat,completed:0,total:total||10,
    lastLesson:"",lastStudied:null,videos:[],playlistId:null};
  if(plat==="youtube"){
    let pid=extractPlaylistId(link);
    if(pid&&getYtKey()){
      showNotif("🔄 Fetching playlist...");
      let r=await fetchYTPlaylist(pid);
      if(r.ok){obj.videos=r.videos;obj.total=r.total;obj.playlistId=pid;
        obj.lastLesson=r.videos[0]?.title||"Lesson 1";
        showNotif(`✅ Loaded ${r.total} lessons`,"success");
      }else{showNotif("⚠ Could not load playlist: "+r.error,"warn");obj.playlistId=pid;}
    }else if(pid){obj.playlistId=pid;showNotif("ℹ Add YouTube API key for auto-tracking");}
  }
  if(!obj.total||obj.total<=0)obj.total=total||10;
  courses.push(obj);
  ["courseName","courseLink","courseTotal"].forEach(i=>{let e=document.getElementById(i);if(e)e.value="";});
  generateTodayTasks();showCourses();renderCourseMeters();saveData();refreshDashboard();
  showNotif(`📚 "${name}" added`,"success");
}

async function completeLessonWithTracking(i){
  let c=courses[i]; if(!c||c.completed>=c.total)return;
  let lessonNum=c.completed+1;
  let defName=c.videos?.length?c.videos[c.completed]?.title||`Lesson ${lessonNum}`:`Lesson ${lessonNum}`;
  let lName=prompt("Mark as complete:",defName)||defName;
  if(lName===null)return;
  c.completed++; c.lastLesson=lName;
  c.lastStudied=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short"});
  let nextUrl=buildContinueUrl(c); if(nextUrl)c.link=nextUrl;
  studyHistory.unshift({date:new Date().toISOString().split("T")[0],courseName:c.name,lesson:lName,lessonNum});
  if(studyHistory.length>100)studyHistory.pop();
  addXP(20);generateTodayTasks();showCourses();renderCourseMeters();saveData();refreshDashboard();
  let pct=Math.round((c.completed/c.total)*100);
  showNotif(`✅ ${lName} — ${pct}% done! +20 XP`,"success");
  if(c.videos&&c.completed<c.videos.length){
    let nxt=c.videos[c.completed];
    if(nxt)setTimeout(()=>showNotif(`▶ Next: ${nxt.title}`),1600);
  }
}
function undoLesson(i){
  if(courses[i].completed>0)courses[i].completed--;
  generateTodayTasks();showCourses();renderCourseMeters();saveData();refreshDashboard();
}
function resumeCourse(i){window.open(buildContinueUrl(courses[i])||courses[i].link,"_blank");}
function deleteCourse(i){
  if(!confirm(`Delete "${courses[i].name}"?`))return;
  courses.splice(i,1);generateTodayTasks();showCourses();renderCourseMeters();saveData();refreshDashboard();
}
function editCourse(i){
  let n=prompt("Name",courses[i].name);
  let l=prompt("Link",courses[i].link);
  let t=prompt("Total lessons",courses[i].total);
  if(n&&l&&t){courses[i].name=n;courses[i].link=l;courses[i].total=parseInt(t);
    showCourses();renderCourseMeters();saveData();refreshDashboard();}
}
function showCourses(){
  let el=document.getElementById("courseContainer"); if(!el)return;
  if(!courses.length){el.innerHTML='<p class="empty">No courses yet.</p>';return;}
  el.innerHTML=courses.map((c,i)=>{
    let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
    let cls=pct>=75?"g":pct>=40?"y":"b";
    let pBadgeCls=c.platform==="youtube"?"yt":c.platform==="udemy"?"ud":"ot";
    let pBadgeTxt=c.platform==="youtube"?"▶ YouTube":c.platform==="udemy"?"Udemy":"🔗 Link";
    let nextHtml="";
    if(c.videos?.length&&c.completed<c.videos.length){
      nextHtml=`<div class="nextBadge">▶ Next: ${c.videos[c.completed]?.title||"Next lesson"}</div>`;
    }else if(c.lastLesson){
      nextHtml=`<div class="lastBadge">📍 Last: ${c.lastLesson}</div>`;
    }else{
      nextHtml=`<div class="lastBadge newBadge">🆕 Start learning</div>`;
    }
    return`<div class="cCard">
      <div class="cCardTop">
        <div><div class="pBadge ${pBadgeCls}">${pBadgeTxt}</div><h3>${c.name}</h3></div>
        <span class="pctBadge ${cls}">${pct}%</span>
      </div>
      <div class="lessonBar">
        <div class="lBarTrack"><div class="lBarFill ${cls}" style="width:${pct}%"></div></div>
        <span class="lCount">${c.completed} / ${c.total} lessons</span>
      </div>
      ${nextHtml}
      ${c.lastStudied?`<span class="lastSt">Last studied: ${c.lastStudied}</span>`:""}
      <div class="cBtns">
        <button class="btnGreen" onclick="completeLessonWithTracking(${i})">✓ Done</button>
        <button class="btnBlue"  onclick="resumeCourse(${i})">▶ Continue</button>
        <button class="btnGhost" onclick="undoLesson(${i})">↺</button>
        <button class="btnGhost" onclick="editCourse(${i})">✏</button>
        <button class="btnRed"   onclick="deleteCourse(${i})">🗑</button>
      </div>
    </div>`;
  }).join("");
}

// ── COURSE METERS ─────────────────────────────────────────────
function renderCourseMeters(){
  let el=document.getElementById("courseMeters"); if(!el)return;
  if(!courses.length){el.innerHTML='<p class="empty">Add a course to see meters.</p>';el.className="metersWrap";return;}
  let cnt=courses.length, mode=cnt<=3?"ring":cnt<=6?"ringS":"bar";
  let sz=mode==="ring"?110:75;
  el.className="metersWrap"+(mode==="bar"?" barMode":"");
  el.innerHTML=courses.map(c=>{
    let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
    return mode==="bar"?barMeter(c,pct):ringMeter(c,pct,sz);
  }).join("");
}
function ringMeter(c,pct,sz){
  let r=(sz/2)-9,ci=2*Math.PI*r,off=ci-(pct/100)*ci,cx=sz/2;
  let col=pct>=75?"#10b981":pct>=40?"#f59e0b":"#38bdf8";
  return`<div class="meterItem">
    <svg width="${sz}" height="${sz}">
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="8"></circle>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${col}" stroke-width="8"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cx})"
        style="stroke-dasharray:${ci};stroke-dashoffset:${off};transition:stroke-dashoffset .9s"></circle>
      <text x="${cx}" y="${cx+5}" text-anchor="middle" fill="${col}" font-size="${sz<90?11:13}" font-weight="700">${pct}%</text>
    </svg>
    <p class="mLbl">${c.name}</p>
    ${c.lastLesson?`<p class="mSub">▶ ${c.lastLesson}</p>`:""}
  </div>`;
}
function barMeter(c,pct){
  let cls=pct>=75?"g":pct>=40?"y":"";
  return`<div class="mBar">
    <div class="mBarHdr"><span>${c.name}</span>
      <span style="color:${pct>=75?"var(--green)":pct>=40?"var(--amber)":"var(--cyan)"};font-weight:700">${pct}%</span>
    </div>
    <div class="mBarTrack"><div class="mBarFill ${cls}" style="width:${pct}%"></div></div>
    ${c.lastLesson?`<div class="mBarSub">▶ ${c.lastLesson}</div>`:""}
  </div>`;
}

// ── TASKS ─────────────────────────────────────────────────────
function generateTodayTasks(){
  let prev={}; todaysTasks.forEach(t=>{prev[t.name]=t.done;});
  todaysTasks=[];
  courses.forEach(c=>{
    if(c.completed<c.total){
      let t1=`📚 ${c.name} — Lesson ${c.completed+1}`;
      todaysTasks.push({name:t1,done:prev[t1]||false});
      if(c.completed>0){let t2=`📝 Revise ${c.name}`;todaysTasks.push({name:t2,done:prev[t2]||false});}
    }
  });
  scholarships.forEach(s=>{
    let p=s.requirements.filter(r=>!s.completed.includes(r));
    if(p.length){let t3=`🎓 ${s.name}: ${p[0]}`;todaysTasks.push({name:t3,done:prev[t3]||false});}
  });
  saveData();
}
function showTodayTasks(){
  let pEl=document.getElementById("pendingTasks"),cEl=document.getElementById("completedTasks");
  let sumEl=document.getElementById("taskProgressSummary"),barEl=document.getElementById("rBarFill");
  let pCt=document.getElementById("pendingCount"),cCt=document.getElementById("completedCount");
  if(!pEl||!cEl)return;
  pEl.innerHTML="";cEl.innerHTML="";
  let done=todaysTasks.filter(t=>t.done).length,total=todaysTasks.length;
  let pct=total>0?Math.round((done/total)*100):0;
  if(pCt)pCt.textContent=total-done; if(cCt)cCt.textContent=done;
  if(sumEl)sumEl.textContent=`${done}/${total} tasks — ${pct}%`;
  if(barEl)barEl.style.width=pct+"%";
  todaysTasks.forEach((t,i)=>{
    let html=`<div class="taskItem${t.done?" done":""}">
      <input type="checkbox" class="taskCheck" ${t.done?"checked":""} onchange="toggleTask(${i})">
      <span>${t.name}</span></div>`;
    if(t.done)cEl.innerHTML+=html; else pEl.innerHTML+=html;
  });
  if(!pEl.innerHTML)pEl.innerHTML='<p class="empty" style="color:var(--green)">🎉 All done!</p>';
}
function toggleTask(i){
  let was=todaysTasks[i].done; todaysTasks[i].done=!was;
  if(!was){addXP(10);updateStreak();showNotif("✅ Task done +10 XP","success");}
  else{userXP=Math.max(0,userXP-10);showNotif("↩ Unchecked");}
  updateStudyData();saveData();showTodayTasks();refreshDashboard();
}

// ── SCHOLARSHIPS ──────────────────────────────────────────────
function renderScholarPage(){
  showScholarships(); renderRecommendation();
  // populate country filter
  let cel=document.getElementById("fCountry");
  if(cel&&cel.options.length<=1){
    [...new Set(SCHOL_DB.map(s=>stripEmoji(s.country).trim()))].sort()
      .forEach(ct=>{let o=document.createElement("option");o.value=ct;o.textContent=ct;cel.appendChild(o);});
  }
  applyScholarSearch();
}
function applyScholarSearch(){
  let q=(document.getElementById("scholarSearch")?.value||"").toLowerCase().trim();
  let deg=document.getElementById("fDegree")?.value||"";
  let cat=document.getElementById("fCategory")?.value||"";
  let cty=document.getElementById("fCountry")?.value||"";
  let results=SCHOL_DB.filter(s=>{
    let cName=stripEmoji(s.country).toLowerCase();
    let mQ=!q||[s.name,s.country,s.desc,...(s.category||[])].some(f=>stripEmoji(f||"").toLowerCase().includes(q));
    let mD=!deg||(s.degree||[]).includes(deg);
    let mC=!cat||(s.category||[]).some(c=>c.toLowerCase().includes(cat.toLowerCase()));
    let mCt=!cty||cName.includes(stripEmoji(cty).toLowerCase());
    return mQ&&mD&&mC&&mCt;
  });
  if(!q&&!deg&&!cat&&!cty)results=SCHOL_DB.slice(0,10);
  let el=document.getElementById("searchResults"); if(!el)return;
  if(!results.length){el.innerHTML='<p class="empty">No results. Try a different search.</p>';return;}
  el.innerHTML=results.slice(0,12).map(s=>{
    let already=scholarships.some(x=>x.id===s.id);
    let days=Math.ceil((new Date(s.deadline)-new Date())/86400000);
    let urg=days<=30?"🔴":days<=90?"🟡":"🟢";
    return`<div class="srCard">
      <div class="srHeader">
        <span class="srFlag">${s.flag}</span>
        <div class="srInfo"><h4>${s.name}</h4><span class="srCty">${s.country}</span></div>
        <div class="srRight">
          <span class="srDl">${urg} ${days}d left</span>
          ${already?'<span class="srAdded">✓ Added</span>':`<button class="btnSm btnBlue" onclick="addScholFromDB('${s.id}')">+ Add</button>`}
        </div>
      </div>
      <p class="srDesc">${s.desc}</p>
      <div class="srTags">
        ${(s.degree||[]).map(d=>`<span class="tag">${d}</span>`).join("")}
        ${(s.category||[]).slice(0,2).map(c=>`<span class="tag tagC">${c}</span>`).join("")}
        <span class="tag tagA">💰 ${s.amount}</span>
      </div>
    </div>`;
  }).join("");
}
function addScholFromDB(id){
  let s=SCHOL_DB.find(x=>x.id===id); if(!s)return;
  if(scholarships.some(x=>x.id===id)){showNotif("⚠ Already added","warn");return;}
  scholarships.push({id:s.id,name:s.name,country:s.country,flag:s.flag,
    requirements:[...(SCHOL_REQS[id]||["Passport","SOP","LOR"])],
    completed:[],expanded:false,deadline:s.deadline,amount:s.amount});
  if(s.deadline){
    let dn=`${s.name} Application`;
    if(!deadlines.some(d=>d.name===dn))deadlines.push({name:dn,date:s.deadline});
  }
  generateTodayTasks();saveData();showScholarships();applyScholarSearch();refreshDashboard();
  showNotif(`🎓 ${s.name} added!`,"success");
}
function showScholarships(){
  let el=document.getElementById("scholarshipContainer"); if(!el)return;
  if(!scholarships.length){el.innerHTML='<p class="empty">No scholarships yet — search above.</p>';return;}
  el.innerHTML=scholarships.map((s,i)=>{
    let done=s.completed.length,total=s.requirements.length;
    let pct=total>0?Math.round((done/total)*100):0;
    let days=s.deadline?Math.max(0,Math.ceil((new Date(s.deadline)-new Date())/86400000)):null;
    let urg=days!=null?(days<=30?"🔴":days<=90?"🟡":"🟢"):"";
    return`<div class="sCard">
      <div class="sCardHdr"><span class="sFlag">${s.flag||"🎓"}</span>
        <div><h3>${s.name}</h3>
          <p class="sMeta">${s.country}${days!=null?` · ${urg} ${days} days left`:""}</p>
        </div>
      </div>
      <div class="sProgress">
        <div class="sBarTrack"><div class="sBarFill" style="width:${pct}%"></div></div>
        <p class="sPct">${done}/${total} · ${pct}%</p>
      </div>
      <button class="sToggle" onclick="toggleExpand(${i})">${s.expanded?"▼ Hide":"▶ Show"} requirements</button>
      ${s.expanded?`<div class="reqList">${s.requirements.map(r=>`
        <div class="reqItem">
          <input type="checkbox" class="scholChk" ${s.completed.includes(r)?"checked":""}
            onchange="toggleReq(${i},'${r.replace(/'/g,"\\'")}')">
          <span>${r}</span>
        </div>`).join("")}</div>`:""}
      <button class="btnDanger" onclick="deleteSchol(${i})">🗑 Remove</button>
    </div>`;
  }).join("");
}
function toggleExpand(i){scholarships[i].expanded=!scholarships[i].expanded;saveData();showScholarships();}
function toggleReq(i,req){
  let s=scholarships[i];
  if(s.completed.includes(req)){s.completed=s.completed.filter(r=>r!==req);userXP=Math.max(0,userXP-10);showNotif("↩ Unchecked");}
  else{s.completed.push(req);addXP(10);showNotif("✅ Requirement done +10 XP","success");}
  generateTodayTasks();saveData();showScholarships();refreshDashboard();
}
function deleteSchol(i){
  if(!confirm(`Remove ${scholarships[i].name}?`))return;
  scholarships.splice(i,1);generateTodayTasks();saveData();showScholarships();refreshDashboard();
}
function renderRecommendation(){
  let el=document.getElementById("recommendScholar"); if(!el)return;
  let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let cp=tL>0?(dL/tL)*100:0;
  let scored=SCHOL_DB.map(s=>{
    let sc=0,ex=scholarships.find(x=>x.id===s.id);
    if(ex)sc+=(ex.completed.length/ex.requirements.length)*40;
    sc+=cp*0.3; sc+=Math.min(streakData.length,30)*1.2;
    sc+=Math.floor(userXP/100)*2; sc+=Math.random()*4;
    return{...s,match:Math.min(99,Math.round(sc))};
  }).sort((a,b)=>b.match-a.match).slice(0,4);
  el.innerHTML=`<div class="recGrid">${scored.map((s,i)=>`
    <div class="recCard${i===0?" top":""}">
      <div class="recL"><span class="recFlag">${s.flag}</span>
        <div><div class="recName">${i===0?"🏆 ":""}${s.name}</div>
          <div class="recCty">${s.country} · ${s.degree.join(", ")}</div>
        </div>
      </div>
      <div class="recScore">
        <div class="recPct" style="color:${i===0?"var(--green)":i===1?"var(--cyan)":"var(--sub)"}">${s.match}%</div>
        <div class="recLbl">match</div>
        ${scholarships.some(x=>x.id===s.id)?'<div class="recAdded">✓ Added</div>':`<button class="btnSm btnBlue" onclick="addScholFromDB('${s.id}')">+ Add</button>`}
      </div>
    </div>`).join("")}</div>`;
}

// ── DEADLINES ─────────────────────────────────────────────────
function addDeadline(){
  let n=document.getElementById("deadlineName")?.value.trim();
  let d=document.getElementById("deadlineDate")?.value;
  if(!n||!d)return;
  deadlines.push({name:n,date:d});
  document.getElementById("deadlineName").value="";
  document.getElementById("deadlineDate").value="";
  saveData();showDeadlines();refreshDashboard();
}
function showDeadlines(){
  let el=document.getElementById("deadlineContainer"); if(!el)return;
  if(!deadlines.length){el.innerHTML='<p class="empty">No deadlines yet.</p>';return;}
  let sorted=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date));
  el.innerHTML=sorted.map((d,i)=>{
    let days=Math.max(0,Math.ceil((new Date(d.date)-new Date())/86400000));
    let cls=days<=3?"u":days<=14?"up":"s";
    let pcls=days<=3?"urgent":days<=14?"upcoming":"";
    return`<div class="planCard ${pcls}">
      <div class="dRow2">
        <div><h3>${d.name}</h3><p>📅 ${d.date}</p></div>
        <div class="dDays ${cls}">${days}d</div>
        <button class="btnRed btnSm" onclick="deleteDeadline(${i})">🗑</button>
      </div>
    </div>`;
  }).join("");
}
function deleteDeadline(i){deadlines.splice(i,1);saveData();showDeadlines();refreshDashboard();}

// ── STREAK ────────────────────────────────────────────────────
function updateStreak(){
  let t=new Date().toISOString().split("T")[0];
  if(!streakData.includes(t))streakData.push(t);
  saveData();
}
function renderStreakCalendar(){
  let el=document.getElementById("streakCalendar"),lb=document.getElementById("streakLabel");
  if(!el)return;
  el.innerHTML="";
  for(let i=29;i>=0;i--){
    let d=new Date(); d.setDate(d.getDate()-i);
    let ds=d.toISOString().split("T")[0];
    let box=document.createElement("div");
    box.className="dayBox"+(streakData.includes(ds)?" activeDay":"");
    box.title=ds; el.appendChild(box);
  }
  if(lb)lb.textContent=streakData.length+" days";
}

// ── CHART ─────────────────────────────────────────────────────
function updateStudyData(){
  let day=new Date().getDay();
  let done=todaysTasks.filter(t=>t.done).length,total=todaysTasks.length;
  studyData[day]=total>0?Math.round((done/total)*100):0;
  saveData();
}
function drawChart(){
  let canvas=document.getElementById("studyChart"); if(!canvas)return;
  if(window._chart){window._chart.data.datasets[0].data=studyData;window._chart.update();return;}
  window._chart=new Chart(canvas,{
    type:"bar",
    data:{
      labels:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      datasets:[{
        label:"Study %",data:studyData,
        backgroundColor:ctx=>{
          let g=ctx.chart.ctx.createLinearGradient(0,0,0,240);
          g.addColorStop(0,"rgba(56,189,248,.85)");
          g.addColorStop(1,"rgba(99,102,241,.4)");
          return g;
        },
        borderRadius:10,barThickness:34,
        borderColor:"rgba(56,189,248,.6)",borderWidth:1
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:c=>` ${c.raw}% study progress`},
          backgroundColor:"rgba(10,20,40,.9)",borderColor:"rgba(56,189,248,.3)",borderWidth:1}
      },
      scales:{
        x:{grid:{color:"rgba(255,255,255,.04)"},ticks:{color:"rgba(255,255,255,.4)",font:{size:12}}},
        y:{beginAtZero:true,max:100,ticks:{stepSize:25,color:"rgba(255,255,255,.4)"},
          grid:{color:"rgba(255,255,255,.04)"}}
      },
      animation:{duration:900,easing:"easeOutQuart"}
    }
  });
}

// ── SCHEDULE / ROADMAP ────────────────────────────────────────
function generateSchedule(){
  let hEl=document.getElementById("studyHours"),hours=parseInt(hEl?.value);
  let plan=document.getElementById("studyPlan"); if(!plan)return;
  if(!hours||hours<=0){alert("Enter valid hours");return;}
  let pending=todaysTasks.filter(t=>!t.done);
  if(!pending.length){plan.innerHTML='<div class="planCard">🎉 No pending tasks!</div>';return;}
  let mins=Math.round((hours*60)/pending.length);
  plan.innerHTML=pending.map(t=>`<div class="planCard"><h3>📚 ${t.name}</h3><p>⏱ ~${mins} min</p></div>`).join("");
  if(hEl)hEl.value="";
}
function renderTimeline(){
  let el=document.getElementById("timelineContainer"); if(!el)return;
  let steps=[];
  let pend=todaysTasks.filter(t=>!t.done);
  if(pend.length)steps.push("Complete: "+pend[0].name);
  let incS=scholarships.find(s=>s.completed.length<s.requirements.length);
  if(incS){let r=incS.requirements.find(x=>!incS.completed.includes(x));
    steps.push(`${incS.name}: work on "${r}"`);}
  if(deadlines.length){
    let near=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0];
    let d=Math.ceil((new Date(near.date)-new Date())/86400000);
    steps.push(`Check deadline: ${near.name} (${d} days left)`);}
  if(courses.length){
    let c=courses.find(x=>x.completed<x.total);
    if(c&&c.lastLesson)steps.push(`Resume ${c.name} after "${c.lastLesson}"`);}
  steps.push("Review today's progress ☕");
  el.innerHTML=steps.map((s,i)=>`<div class="tStep">
    <div class="tDot"></div>
    <div class="tContent"><span class="tNum">Step ${i+1}</span>${s}</div>
  </div>`).join("");
}

// ── PRODUCTIVITY SCORE ────────────────────────────────────────
function calcProdScore(){
  let s=0;
  let done=todaysTasks.filter(t=>t.done).length,total=todaysTasks.length;
  if(total>0)s+=(done/total)*30;
  let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  if(tL>0)s+=(dL/tL)*30;
  s+=Math.min(streakData.length,30)*(20/30);
  let tR=0,dR=0; scholarships.forEach(x=>{tR+=x.requirements.length;dR+=x.completed.length;});
  if(tR>0)s+=(dR/tR)*20;
  return Math.round(s);
}
function renderProdScore(){
  let el=document.getElementById("prodScoreBox"); if(!el)return;
  let s=calcProdScore();
  let col=s>=80?"var(--green)":s>=60?"var(--cyan)":s>=40?"var(--amber)":"var(--red)";
  let lbl=s>=80?"Excellent 🚀":s>=60?"Good 📈":s>=40?"Moderate ⚡":"Building 🌱";
  let done=todaysTasks.filter(t=>t.done).length;
  el.innerHTML=`<div class="prodScoreWrap">
    <div class="prodNum" style="color:${col}">${s}</div>
    <div class="prodLbl">${lbl}</div>
    <div class="prodRows">
      <div class="prodRow"><span>Tasks today</span><span>${done}/${todaysTasks.length}</span></div>
      <div class="prodRow"><span>Eligibility</span><span>${calcEligibility()}%</span></div>
      <div class="prodRow"><span>Streak</span><span>${streakData.length} days</span></div>
      <div class="prodRow"><span>XP earned</span><span>${userXP}</span></div>
    </div>
  </div>`;
}

// ── STUDY HISTORY ─────────────────────────────────────────────
function renderStudyHistory(){
  let el=document.getElementById("studyHistoryContainer"); if(!el)return;
  if(!studyHistory.length){el.innerHTML='<p class="empty">Complete a lesson to build history.</p>';return;}
  el.innerHTML=studyHistory.slice(0,20).map(h=>
    `<div class="histRow"><span class="hDate">${h.date}</span>
      <span class="hCourse">${h.courseName}</span>
      <span class="hLesson">${h.lesson}</span>
    </div>`).join("");
}

// ── ELIGIBILITY ───────────────────────────────────────────────
function calcEligibility(){
  let s=0;
  let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  if(tL>0)s+=(dL/tL)*40;
  let tR=0,dR=0; scholarships.forEach(x=>{tR+=x.requirements.length;dR+=x.completed.length;});
  if(tR>0)s+=(dR/tR)*30;
  s+=Math.min(streakData.length,30)*(20/30);
  let done=todaysTasks.filter(t=>t.done).length;
  if(todaysTasks.length>0)s+=(done/todaysTasks.length)*10;
  return Math.round(s);
}

// ── PROACTIVE NOTIFICATIONS ───────────────────────────────────
function checkProactiveNotifications(){
  deadlines.forEach(d=>{
    let days=Math.ceil((new Date(d.date)-new Date())/86400000);
    if(days<=3)showNotif(`🔴 URGENT: "${d.name}" in ${days} days!`,"urgent");
    else if(days<=7)showNotif(`🟡 Reminder: "${d.name}" in ${days} days`,"warn");
  });
  let today=new Date().toISOString().split("T")[0];
  if(!streakData.includes(today)&&new Date().getHours()>=18)
    showNotif("🔥 Don't break your streak! Complete a task today.","streak");
  let pend=todaysTasks.filter(t=>!t.done).length;
  if(pend>0)setTimeout(()=>showNotif(`📌 ${pend} pending task${pend>1?"s":""} today`),1800);
}

// ── XP & LEVEL ────────────────────────────────────────────────
function addXP(pts){userXP+=pts;showXP();}
function showXP(){
  let lvl=Math.floor(userXP/100)+1, xpIn=userXP%100;
  let xpEl=document.getElementById("xpDisplay"),lvEl=document.getElementById("topUserLevel");
  let bar=document.getElementById("xpBarFill"),sEl=document.getElementById("streakCount");
  if(xpEl)animCount(xpEl,userXP);
  if(lvEl)lvEl.textContent=`Lv ${lvl}`;
  if(bar)bar.style.width=xpIn+"%";
  if(sEl)sEl.textContent=streakData.length;
}

// ── PROFILE ───────────────────────────────────────────────────
function applyTheme(){
  document.body.classList.toggle("light",!darkMode);
  let t=document.getElementById("darkModeToggle"); if(t)t.checked=darkMode;
}
function toggleDarkMode(){
  let t=document.getElementById("darkModeToggle");
  darkMode=t?t.checked:!darkMode; applyTheme(); saveData();
}
function updateProfileDisplay(){
  let n=document.getElementById("userName"); if(n)n.textContent=username||"User";
  let i=document.getElementById("usernameInput"); if(i)i.value=username;
}
function saveProfile(){
  let i=document.getElementById("usernameInput");
  if(i&&i.value.trim())username=i.value.trim();
  saveData(); updateProfileDisplay(); showNotif("✅ Profile saved","success");
}
function showQuote(){
  let el=document.getElementById("dailyQuote"); if(!el)return;
  let q=["Success is built one step at a time.","Discipline beats motivation every time.",
    "Small progress each day adds up to big results.",
    "You don't have to be great to start — but you have to start.",
    "Consistency is the foundation of everything.",
    "The secret of getting ahead is getting started."];
  el.innerHTML=`<em>"${q[Math.floor(Math.random()*q.length)]}"</em>`;
}

// ── AI CHAT ───────────────────────────────────────────────────
function buildAIContext(){
  let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let cp=tL>0?Math.round((dL/tL)*100):0;
  let tR=0,dR=0; scholarships.forEach(s=>{tR+=s.requirements.length;dR+=s.completed.length;});
  let sp=tR>0?Math.round((dR/tR)*100):0;
  let pend=todaysTasks.filter(t=>!t.done);
  let near=deadlines.length?[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
  let nearDays=near?Math.ceil((new Date(near.date)-new Date())/86400000):null;
  return`You are ScholarMate AI — a personal study & scholarship assistant.
STUDENT: ${username||"Student"} | Level ${Math.floor(userXP/100)+1} | XP: ${userXP} | Streak: ${streakData.length} days
COURSES (${cp}% overall):
${courses.map(c=>`• ${c.name}: ${c.completed}/${c.total} (${c.total>0?Math.round((c.completed/c.total)*100):0}%) last: ${c.lastLesson||"not started"}`).join("\n")||"None"}
PENDING TASKS (${pend.length}):
${pend.slice(0,5).map(t=>`• ${t.name}`).join("\n")||"All done!"}
SCHOLARSHIPS (${sp}% reqs done):
${scholarships.map(s=>`• ${s.name}: ${s.completed.length}/${s.requirements.length}`).join("\n")||"None"}
NEAREST DEADLINE: ${near?`${near.name} — ${nearDays} days (${near.date})`:"None"}
ELIGIBILITY: ${calcEligibility()}%
RULES: Under 130 words. Be specific — use exact names. Actionable plans. Brief encouragement.`;
}
async function sendMessage(){
  let inp=document.getElementById("chatInput"),txt=inp?.value.trim();
  if(!txt)return;
  let chat=document.getElementById("chatContainer");
  if(execCmd(txt)){if(inp)inp.value="";return;}
  chat.innerHTML+=`<div class="userMsg">${txt}</div>`;
  chat.innerHTML+=`<div class="aiMsg" id="aiThinking"><span class="aiAv">🤖</span>Thinking...</div>`;
  chat.scrollTop=chat.scrollHeight; if(inp)inp.value="";
  
 try {
    const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
            {
                role: "system",
                content: buildAIContext()
            },
            {
                role: "user",
                content: txt
            }
        ]
    })
    
});

const data = await res.json();
console.log(data.choices[0].message.content);
const thinking = document.getElementById("aiThink");
if(thinking) thinking.remove();

console.log(data);

if(data.error){
    chat.innerHTML += `
    <div class="aiMsg">
        <span class="aiAv">🤖</span>
        ${data.error}
    </div>`;
    return;
}

const reply =
data.choices?.[0]?.message?.content ??
"No response received.";

chat.innerHTML += `
<div class="aiMsg">
    <span class="aiAv">🤖</span>
    ${reply}
</div>`;

chat.scrollTop = chat.scrollHeight;
    }

catch(err){

    console.error(err);

    const thinking = document.getElementById("aiThink");
    if(thinking) thinking.remove();

    chat.innerHTML += `
    <div class="aiMsg">
        <span class="aiAv">🤖</span>
        Connection failed.
    </div>`;
}
}
function execCmd(txt){
  let t=txt.toLowerCase();
  let m={tasks:"taskPage",courses:"coursePage",scholarships:"scholarPage",
    productivity:"productivityPage",settings:"settingsPage",deadlines:"deadlinePage"};
  for(let k in m)if(t.includes(k)){showPage(m[k]);showNotif("📍 "+k);return true;}
  return false;
}
function renderAISide(){
  let elig=calcEligibility();
  let col=elig>=70?"var(--green)":elig>=40?"var(--amber)":"var(--cyan)";
  let eigEl=document.getElementById("eligibilityAI");
  if(eigEl)eigEl.innerHTML=`<div style="text-align:center;padding:10px">
    <div style="font-size:36px;font-weight:900;color:${col}">${elig}%</div>
    <p style="color:var(--sub);font-size:12px;margin-top:4px">Scholarship Readiness</p>
    <p style="font-size:10px;color:var(--muted);margin-top:6px">Courses 40% · Scholarships 30% · Streak 20% · Tasks 10%</p>
  </div>`;
  let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let insEl=document.getElementById("aiInsights");
  if(insEl)insEl.innerHTML=[
    `✅ ${todaysTasks.filter(t=>t.done).length}/${todaysTasks.length} tasks today`,
    `📚 ${courses.length} courses · ${tL>0?Math.round((dL/tL)*100):0}% overall`,
    `🔥 ${streakData.length} day streak`,`⭐ ${userXP} XP · Level ${Math.floor(userXP/100)+1}`
  ].map(s=>`<div class="insightRow">${s}</div>`).join("");
  let sugEl=document.getElementById("suggestionsAI");
  if(sugEl){
    let tips=[],pend=todaysTasks.filter(t=>!t.done);
    if(pend.length)tips.push(`Focus next: "${pend[0].name}"`);
    if(streakData.length<3)tips.push("Build a 3-day streak to unlock Consistency badge.");
    let near=deadlines.length?[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
    if(near){let d=Math.ceil((new Date(near.date)-new Date())/86400000);
      if(d<=14)tips.push(`⚠ "${near.name}" in ${d} days.`);}
    if(!courses.length)tips.push("Add a course to start tracking progress.");
    if(!scholarships.length)tips.push("Add a scholarship to track requirements.");
    if(!tips.length)tips.push("Great work! Keep the streak going 🚀");
    sugEl.innerHTML=tips.map(t=>`<div class="insightRow">💡 ${t}</div>`).join("");
  }
}

// ── DASHBOARD ─────────────────────────────────────────────────
function renderDashboard(){
  // Focus
  let fEl=document.getElementById("todayFocus");
  if(fEl){
    let items=todaysTasks.filter(t=>!t.done).slice(0,4);
    fEl.innerHTML=items.length
      ?items.map(t=>`<div class="focusItem"><span class="fDot"></span>${t.name}</div>`).join("")
      :'<div class="focusItem"><span class="fDot" style="background:var(--green)"></span>🎉 All done!</div>';
  }
  // Quick Status
  let qs=document.getElementById("quickStatus");
  if(qs){
    let done=todaysTasks.filter(t=>t.done).length;
    qs.innerHTML=`
      <div class="qStat"><div class="qsIco">✅</div><div class="qsLbl">Tasks</div><div class="qsVal">${done}/${todaysTasks.length}</div></div>
      <div class="qStat"><div class="qsIco">📚</div><div class="qsLbl">Courses</div><div class="qsVal">${courses.length}</div></div>
      <div class="qStat"><div class="qsIco">⏳</div><div class="qsLbl">Deadlines</div><div class="qsVal">${deadlines.length}</div></div>
      <div class="qStat"><div class="qsIco">🔥</div><div class="qsLbl">Streak</div><div class="qsVal">${streakData.length}</div></div>`;
  }
  // AI suggestion
  let aiEl=document.getElementById("aiSuggestionDashboard");
  if(aiEl){
    let pend=todaysTasks.filter(t=>!t.done);
    let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
    let cp=tL>0?Math.round((dL/tL)*100):0;
    let near=deadlines.length?[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
    let msg;
    let nearDays=near?Math.ceil((new Date(near.date)-new Date())/86400000):null;
    if(nearDays!=null&&nearDays<=7)msg=`⚠ "${near.name}" deadline in ${nearDays} days!`;
    else if(pend.length)msg=`${pend.length} pending tasks. Next: "${pend[0].name}"`;
    else if(cp>0)msg=`Courses at ${cp}%. Keep the momentum!`;
    else msg="Add a course or scholarship to get personalised tips.";
    aiEl.innerHTML=`<div class="aiSuggBox">🤖 ${msg}</div>`;
  }
  // Course snapshot
  let csEl=document.getElementById("courseDashboard");
  if(csEl){
    if(!courses.length){csEl.innerHTML='<p class="empty">No courses yet.</p>';}
    else csEl.innerHTML=`<div class="cSnap">${courses.slice(0,3).map(c=>{
      let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
      return`<div class="cSnapItem">
        <div class="cSnapName">${c.name}${c.lastLesson?`<span class="cTag">▶ ${c.lastLesson}</span>`:""}</div>
        <div class="cSnapBar"><div class="cSnapFill" style="width:${pct}%"></div></div>
        <div class="cSnapPct">${pct}%</div>
      </div>`;
    }).join("")}</div>`;
  }
  // Eligibility ring
  let eigEl=document.getElementById("eligibilityDashboard");
  if(eigEl){
    let sc=calcEligibility(),r=38,ci=2*Math.PI*r,off=ci-(sc/100)*ci;
    let col=sc>=70?"var(--green)":sc>=40?"var(--amber)":"var(--cyan)";
    eigEl.innerHTML=`<div style="position:relative;width:90px;height:90px">
      <svg width="90" height="90">
        <circle cx="45" cy="45" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="8"></circle>
        <circle cx="45" cy="45" r="${r}" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round"
          transform="rotate(-90 45 45)" style="stroke-dasharray:${ci};stroke-dashoffset:${off};transition:stroke-dashoffset .9s"></circle>
      </svg>
      <div class="eligCenter"><span class="eligPct">${sc}%</span><span class="eligLbl">Ready</span></div>
    </div>
    <span class="eligStatus" style="color:${col}">${sc>=70?"High":sc>=40?"Medium":"Low"}</span>`;
  }
  // Task snapshot
  let tsEl=document.getElementById("taskSnapshotDash");
  if(tsEl){
    let done=todaysTasks.filter(t=>t.done).length,rem=todaysTasks.length-done;
    tsEl.innerHTML=`<div class="tSnapGrid">
      <div class="tSnapRow"><span>Completed</span><span class="tSnapN g">${done}</span></div>
      <div class="tSnapRow"><span>Remaining</span><span class="tSnapN a">${rem}</span></div>
    </div>`;
  }
  // Deadlines
  let dlEl=document.getElementById("deadlineDashboard");
  if(dlEl){
    if(!deadlines.length){dlEl.innerHTML='<p class="empty">No deadlines 🎉</p>';}
    else dlEl.innerHTML=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,4).map(d=>{
      let days=Math.max(0,Math.ceil((new Date(d.date)-new Date())/86400000));
      let cls=days<=3?"urgent":days<=14?"upcoming":"";
      return`<div class="dChip ${cls}">
        <span class="dChipDays" style="color:${days<=3?"var(--red)":days<=14?"var(--amber)":"var(--green)"}">${days}d</span>
        <div><div class="dChipName">${d.name}</div><div class="dChipDate">📅 ${d.date}</div></div>
      </div>`;
    }).join("");
  }
  // update counts
  let nc=document.getElementById("notificationCount");
  if(nc)nc.textContent=todaysTasks.filter(t=>!t.done).length+deadlines.length;
  showXP(); updateProfileDisplay();
}

// ── REFRESH ───────────────────────────────────────────────────
function refreshDashboard(){
  try{
    renderDashboard();
    let sEl=document.getElementById("streakCount"); if(sEl)sEl.textContent=streakData.length;
  }catch(e){console.error(e);}
}

// ── BOOT ──────────────────────────────────────────────────────
window.onload=function(){
  try{userXP=JSON.parse(localStorage.getItem("userXP"))||0;}catch(e){}
  applyTheme();
  setTimeout(()=>{
    let ld=document.getElementById("loadingScreen");
    if(ld)ld.style.display="none";
  },1400);
  };
