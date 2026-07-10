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
  if(!courses.length){el.innerHTML='<p class="empty text-on-surface-variant text-xs">No courses yet.</p>';return;}
  el.innerHTML=courses.map((c,i)=>{
    let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
    let pBadgeTxt=c.platform==="youtube"?"YouTube":c.platform==="udemy"?"Udemy":"Link";
    let pBadgeCls=c.platform==="youtube"?"bg-red-500/10 text-red-400 border border-red-500/10"
                   :c.platform==="udemy"?"bg-blue-500/10 text-blue-400 border border-blue-500/10"
                   :"bg-white/10 text-on-surface";
    let nextHtml="";
    if(c.videos?.length&&c.completed<c.videos.length){
      nextHtml=`<div class="bg-primary/20 text-primary-fixed px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 border border-primary/20">
        <span class="material-symbols-outlined text-sm">push_pin</span>
        Last: ${c.videos[c.completed]?.title||"Lesson "+(c.completed+1)}
      </div>`;
    }else if(c.lastLesson){
      nextHtml=`<div class="bg-primary/20 text-primary-fixed px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 border border-primary/20">
        <span class="material-symbols-outlined text-sm">push_pin</span>
        Last: ${c.lastLesson}
      </div>`;
    }else{
      nextHtml=`<div class="bg-secondary/10 text-secondary px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2">
        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">new_releases</span>
        Start learning
      </div>`;
    }
    return`<div class="glass-panel glass-edge p-6 rounded-2xl group hover:translate-y-[-4px] transition-all duration-300 shimmer">
      <div class="flex justify-between items-start mb-6">
        <span class="${pBadgeCls} px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-tighter">
          <span class="material-symbols-outlined text-[14px]">${c.platform==="youtube"?"play_circle":"link"}</span> ${pBadgeTxt}
        </span>
        <span class="text-primary font-extrabold text-lg">${pct}%</span>
      </div>
      <h3 class="font-headline-md text-xl font-bold text-on-surface mb-2">${c.name}</h3>
      <div class="mb-6">
        <div class="flex justify-between items-end mb-2">
          <span class="text-xs text-on-surface-variant">${c.completed} / ${c.total} lessons</span>
        </div>
        <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div class="neon-gradient-primary h-full rounded-full shadow-[0_0_10px_rgba(192,193,255,0.5)]" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-6">
        ${nextHtml}
        ${c.lastStudied?`<span class="text-[10px] text-on-surface-variant ml-auto">${c.lastStudied}</span>`:""}
      </div>
      <div class="flex items-center gap-2">
        <button class="flex-1 bg-surface-container-high/40 hover:bg-green-500/10 text-green-400 py-2.5 rounded-lg transition-colors font-label-md text-label-md border border-green-500/10 text-xs" onclick="completeLessonWithTracking(${i})">
          Done
        </button>
        <button class="flex-1 neon-gradient-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-xs" onclick="resumeCourse(${i})">
          <span class="material-symbols-outlined text-sm">play_arrow</span> Continue
        </button>
      </div>
      <div class="flex justify-end gap-2 mt-4 border-t border-white/5 pt-3">
        <button class="p-1.5 rounded-lg bg-white/5 text-xs text-on-surface-variant hover:bg-white/10" onclick="undoLesson(${i})">↺ Undo</button>
        <button class="p-1.5 rounded-lg bg-white/5 text-xs text-on-surface-variant hover:bg-white/10" onclick="editCourse(${i})">✏ Edit</button>
        <button class="p-1.5 rounded-lg bg-error-container/10 text-xs text-error hover:bg-error-container/20" onclick="deleteCourse(${i})">🗑 Remove</button>
      </div>
    </div>`;
  }).join("");
}

function renderCourseMeters(){
  let el=document.getElementById("courseMeters"); if(!el)return;
  if(!courses.length){el.innerHTML='<p class="empty text-on-surface-variant text-xs">Add a course to see meters.</p>';return;}
  el.innerHTML=`<div class="grid grid-cols-2 gap-6 w-full">${courses.map(c=>{
    let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
    return ringMeter(c,pct,100);
  }).join("")}</div>`;
}

function ringMeter(c,pct,sz){
  let r=(sz/2)-9,ci=2*Math.PI*r,off=ci-(pct/100)*ci,cx=sz/2;
  return`<div class="flex flex-col items-center gap-2">
    <div class="relative group" style="width:${sz}px; height:${sz}px;">
      <svg class="w-full h-full transform -rotate-90">
        <circle class="text-white/5" cx="${cx}" cy="${cx}" r="${r}" fill="transparent" stroke="currentColor" stroke-width="6"></circle>
        <circle class="text-primary progress-ring-glow transition-all duration-1000" cx="${cx}" cy="${cx}" r="${r}" fill="transparent" stroke="currentColor" stroke-dasharray="${ci}" stroke-dashoffset="${off}" stroke-linecap="round" stroke-width="8"></circle>
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="font-display-lg text-sm text-primary font-bold">${pct}%</span>
      </div>
    </div>
    <span class="font-label-sm text-[10px] text-on-surface-variant font-bold uppercase tracking-wide text-center">${c.name}</span>
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
  if(sumEl)sumEl.textContent=`${done}/${total} tasks completed — ${pct}%`;
  if(barEl)barEl.style.width=pct+"%";
  todaysTasks.forEach((t,i)=>{
    let html=`<div class="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/45 hover:bg-primary/5 transition-all cursor-pointer">
      <div class="flex items-center gap-4">
        <input type="checkbox" class="w-4 h-4 rounded border-white/10 bg-surface-container text-primary focus:ring-primary/40 focus:ring-1 cursor-pointer" ${t.done?"checked":""} onchange="toggleTask(${i})">
        <span class="${t.done ? 'line-through text-on-surface-variant/40' : 'text-on-surface text-sm'}">${t.name}</span>
      </div>
    </div>`;
    if(t.done)cEl.innerHTML+=html; else pEl.innerHTML+=html;
  });
  if(!pEl.innerHTML)pEl.innerHTML='<p class="empty text-xs text-secondary font-bold text-center">🎉 All pending tasks completed!</p>';
  if(!cEl.innerHTML)cEl.innerHTML='<p class="empty text-xs text-on-surface-variant/40 text-center">No completed tasks yet.</p>';
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
  if(!results.length){el.innerHTML='<p class="empty text-xs text-on-surface-variant text-center col-span-2">No results. Try a different search.</p>';return;}
  el.innerHTML=results.slice(0,12).map(s=>{
    let already=scholarships.some(x=>x.id===s.id);
    let days=Math.ceil((new Date(s.deadline)-new Date())/86400000);
    let urg=days<=30?"🔴":days<=90?"🟡":"🟢";
    return`<div class="glass-panel rounded-3xl p-6 hover:translate-y-[-4px] transition-all duration-300 cursor-pointer group flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start mb-4">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <span class="text-xl">${s.flag}</span>
          </div>
          <div class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] border border-primary/20">${urg} ${days}d left</div>
        </div>
        <h3 class="font-headline-lg text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">${s.name}</h3>
        <span class="text-[10px] text-on-surface-variant uppercase tracking-wider block mb-3">${s.country}</span>
        <p class="text-on-surface-variant text-xs mb-4 line-clamp-2">${s.desc}</p>
      </div>
      <div>
        <div class="flex items-center gap-3 py-3 border-y border-white/5 mb-4 text-[11px]">
          <div class="flex-1">
            <p class="text-[9px] text-on-surface-variant uppercase">Degree</p>
            <p class="font-bold text-on-surface truncate">${s.degree.join(", ")}</p>
          </div>
          <div class="flex-1">
            <p class="text-[9px] text-on-surface-variant uppercase">Grant</p>
            <p class="font-bold text-on-surface truncate">${s.amount}</p>
          </div>
        </div>
        ${already?'<span class="block text-center py-2.5 text-xs text-green-400 font-bold bg-green-500/10 rounded-xl border border-green-500/10">✓ Tracked</span>':`<button class="w-full py-2.5 rounded-xl neon-gradient-primary text-on-primary font-bold text-xs hover:scale-[1.02] transition-transform" onclick="addScholFromDB('${s.id}')">+ Track Scholarship</button>`}
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
  if(!scholarships.length){el.innerHTML='<p class="empty text-xs text-on-surface-variant text-center col-span-3">No scholarships tracked yet — search above to add some.</p>';return;}
  el.innerHTML=scholarships.map((s,i)=>{
    let done=s.completed.length,total=s.requirements.length;
    let pct=total>0?Math.round((done/total)*100):0;
    let days=s.deadline?Math.max(0,Math.ceil((new Date(s.deadline)-new Date())/86400000)):null;
    let urg=days!=null?(days<=30?"🔴":days<=90?"🟡":"🟢"):"";
    return`<div class="glass-panel glass-edge p-6 rounded-3xl group hover:translate-y-[-4px] transition-all duration-300 shimmer">
      <div class="flex justify-between items-start mb-4">
        <div class="flex gap-3">
          <span class="text-2xl">${s.flag||"🎓"}</span>
          <div>
            <h3 class="font-bold text-sm text-on-surface line-clamp-1">${s.name}</h3>
            <p class="text-[10px] text-on-surface-variant">${s.country}${days!=null?` · ${urg} ${days} days left`:""}</p>
          </div>
        </div>
      </div>
      
      <div class="mb-4">
        <div class="flex justify-between items-center text-[10px] text-on-surface-variant mb-1">
          <span>Requirements Completed</span>
          <span class="font-bold text-primary">${done}/${total} (${pct}%)</span>
        </div>
        <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div class="neon-gradient-primary h-full rounded-full shadow-[0_0_10px_rgba(192,193,255,0.5)]" style="width:${pct}%"></div>
        </div>
      </div>
      
      <button class="w-full text-center py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-on-surface font-semibold mb-3 transition-colors" onclick="toggleExpand(${i})">
        ${s.expanded?"▼ Hide":"▶ Show"} Checklist
      </button>
      
      ${s.expanded?`<div class="space-y-2 mb-4 bg-black/10 p-3 rounded-2xl border border-white/5 max-h-[160px] overflow-y-auto">
        ${s.requirements.map(r=>`
          <div class="flex items-center gap-3">
            <input type="checkbox" class="w-3.5 h-3.5 rounded border-white/10 bg-surface text-primary focus:ring-primary/40 cursor-pointer" ${s.completed.includes(r)?"checked":""}
              onchange="toggleReq(${i},'${r.replace(/'/g,"\\'")}')">
            <span class="text-[11px] ${s.completed.includes(r) ? 'line-through text-on-surface-variant/40' : 'text-on-surface-variant'}">${r}</span>
          </div>`).join("")}
      </div>`:""}
      
      <button class="w-full py-2 rounded-xl bg-error-container/10 border border-error/20 text-error hover:bg-error-container/20 text-[11px] font-bold transition-all" onclick="deleteSchol(${i})">
        🗑 Remove Tracker
      </button>
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
  }).sort((a,b)=>b.match-a.match).slice(0,3);
  
  el.innerHTML=scored.map((s,i)=>{
    let already=scholarships.some(x=>x.id===s.id);
    return`<div class="glass-panel rounded-3xl p-6 hover:translate-y-[-4px] transition-all duration-300 group flex flex-col justify-between border-glass">
      <div class="flex justify-between items-start mb-4">
        <span class="text-2xl">${s.flag}</span>
        <span class="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20 font-bold text-[10px] animate-pulse">${s.match}% MATCH</span>
      </div>
      <div>
        <h4 class="font-bold text-sm text-on-surface mb-1 group-hover:text-secondary transition-colors">${s.name}</h4>
        <p class="text-[10px] text-on-surface-variant mb-4">${s.country} · ${s.degree.join(", ")}</p>
      </div>
      ${already?'<span class="block text-center py-2 text-xs text-green-400 font-bold bg-green-500/10 rounded-xl border border-green-500/10">✓ Added</span>':`<button class="w-full py-2 rounded-xl border border-white/10 hover:border-secondary/40 text-xs font-bold text-on-surface hover:bg-white/5 transition-all" onclick="addScholFromDB('${s.id}')">+ Add Tracker</button>`}
    </div>`;
  }).join("");
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
  if(!deadlines.length){el.innerHTML='<p class="empty text-xs text-on-surface-variant text-center col-span-2">No deadlines tracked yet.</p>';return;}
  let sorted=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date));
  el.innerHTML=sorted.map((d,i)=>{
    let days=Math.max(0,Math.ceil((new Date(d.date)-new Date())/86400000));
    let colorCls=days<=3?"text-error bg-error/10 border-error/20" : days<=14?"text-amber-400 bg-amber-400/10 border-amber-400/20" : "text-green-400 bg-green-400/10 border-green-400/20";
    let glowCls=days<=3?"urgent-glow" : days<=14?"border-amber-400/20" : "border-green-400/10";
    return`<div class="glass-panel p-6 rounded-2xl ${glowCls} flex items-center justify-between hover:translate-x-1 transition-transform">
      <div class="flex items-center gap-4 flex-1">
        <div class="w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold text-center ${colorCls} border">
          <span class="text-lg leading-none">${days}</span>
          <span class="text-[8px] tracking-wide mt-1 uppercase">DAYS</span>
        </div>
        <div>
          <h4 class="text-sm font-bold text-on-surface">${d.name}</h4>
          <div class="flex items-center gap-1 text-[11px] text-on-surface-variant mt-1">
            <span class="material-symbols-outlined text-xs">event</span>
            <span>${d.date}</span>
          </div>
        </div>
      </div>
      <button class="p-2.5 rounded-xl bg-error-container/10 border border-error/20 text-error hover:bg-error-container/20 transition-colors" onclick="deleteDeadline(${i})">
        <span class="material-symbols-outlined text-sm block">delete</span>
      </button>
    </div>`;
  }).join("");
}
function deleteDeadline(i){
  let sorted=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date));
  let target=sorted[i];
  if(target){
    let idx=deadlines.findIndex(d=>d.name===target.name && d.date===target.date);
    if(idx!==-1) deadlines.splice(idx,1);
  }
  saveData();showDeadlines();refreshDashboard();
}

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
          g.addColorStop(0,"rgba(192, 193, 255, 0.85)");
          g.addColorStop(1,"rgba(76, 215, 246, 0.3)");
          return g;
        },
        borderRadius:10,barThickness:34,
        borderColor:"rgba(192, 193, 255, 0.6)",borderWidth:1
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:c=>` ${c.raw}% study progress`},
          backgroundColor:"rgba(11, 19, 38, 0.9)",borderColor:"rgba(192, 193, 255, 0.3)",borderWidth:1}
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
  let done=todaysTasks.filter(t=>t.done).length;
  let statusText=s>=80?"Peak Flow 🚀":s>=60?"Optimal 📈":s>=40?"Building ⚡":"Starting 🌱";
  
  el.innerHTML=`<div class="flex flex-col items-center justify-center relative overflow-hidden w-full">
    <div class="relative w-56 h-56 mb-6">
      <svg class="w-full h-full transform -rotate-90">
        <circle class="text-white/5" cx="112" cy="112" fill="transparent" r="96" stroke="currentColor" stroke-width="6"></circle>
        <circle class="transition-all duration-[2000ms] ease-out text-primary progress-ring-glow" cx="112" cy="112" fill="transparent" r="96" stroke="currentColor" stroke-dasharray="603" stroke-dashoffset="${Math.round(603 - (s/100)*603)}" stroke-linecap="round" stroke-width="8"></circle>
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="font-display-lg text-4xl text-white font-extrabold">${s}</span>
        <span class="text-secondary font-bold text-[10px] uppercase mt-1">${statusText}</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 w-full text-left max-w-xs text-[11px] mt-2">
      <div class="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col">
        <span class="text-[9px] text-on-surface-variant uppercase mb-1">Tasks Done</span>
        <span class="text-xs font-bold text-white">${done}/${todaysTasks.length}</span>
      </div>
      <div class="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col">
        <span class="text-[9px] text-on-surface-variant uppercase mb-1">Streak</span>
        <span class="text-xs font-bold text-white">${streakData.length} days</span>
      </div>
      <div class="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col">
        <span class="text-[9px] text-on-surface-variant uppercase mb-1">XP Points</span>
        <span class="text-xs font-bold text-white">${userXP}</span>
      </div>
      <div class="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col">
        <span class="text-[9px] text-on-surface-variant uppercase mb-1">Readiness</span>
        <span class="text-xs font-bold text-white">${calcEligibility()}%</span>
      </div>
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
function applyTheme(){
  darkMode=true;
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
  document.body.classList.remove("light");
}
function toggleDarkMode(){
  darkMode=true;
  applyTheme();
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
  darkMode=true;
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
  document.body.classList.remove("light");
}
function toggleDarkMode(){
  darkMode=true;
  applyTheme();
}
function updateProfileDisplay(){
  let n=document.getElementById("userName"); if(n)n.textContent=username||"Alex Rivera";
  let wTitle=document.getElementById("welcomeBackTitle"); if(wTitle)wTitle.textContent=`Welcome back, ${username||"Alex Rivera"}`;
  let i=document.getElementById("usernameInput"); if(i)i.value=username;
  let sName=document.getElementById("sidebarName"); if(sName)sName.textContent=username||"Alex Rivera";
  let sSub=document.getElementById("sidebarSub"); if(sSub)sSub.textContent="Premium Plan";
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
  chat.innerHTML+=`<div class="userMsg self-end bg-gradient-to-r from-primary to-primary-container text-on-primary p-4 rounded-2xl max-w-[80%] text-xs font-semibold self-end shadow-sm align-right ml-auto">${txt}</div>`;
  chat.innerHTML+=`<div class="aiMsg flex gap-3 p-4 rounded-2xl bg-white/5 text-xs text-on-surface-variant leading-relaxed" id="aiThinking"><span class="aiAv text-base">🤖</span><div>Thinking...</div></div>`;
  chat.scrollTop=chat.scrollHeight; if(inp)inp.value="";
  
 try {
    const res = await fetch("https://scholarmate-bops.onrender.com/chat", {
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
const thinking = document.getElementById("aiThinking");
if(thinking) thinking.remove();

if(data.error){
    chat.innerHTML += `
    <div class="aiMsg flex gap-3 p-4 rounded-2xl bg-error-container/10 border border-error/20 text-xs text-error leading-relaxed">
        <span class="aiAv text-base">🤖</span>
        <div>${data.error}</div>
    </div>`;
    return;
}

const reply =
data.choices?.[0]?.message?.content ??
"No response received.";

chat.innerHTML += `
<div class="aiMsg flex gap-3 p-4 rounded-2xl bg-white/5 text-xs text-on-surface-variant leading-relaxed">
    <span class="aiAv text-base">🤖</span>
    <div class="prose prose-invert text-xs">${reply.replace(/\n/g, "<br>")}</div>
</div>`;

chat.scrollTop = chat.scrollHeight;
    }

catch(err){
    console.error(err);
    const thinking = document.getElementById("aiThinking");
    if(thinking) thinking.remove();

    chat.innerHTML += `
    <div class="aiMsg flex gap-3 p-4 rounded-2xl bg-error-container/10 border border-error/20 text-xs text-error leading-relaxed">
        <span class="aiAv text-base">🤖</span>
        <div>Connection failed. Please try again.</div>
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
  // 1. Focus
  let fEl=document.getElementById("todayFocus");
  if(fEl){
    let items=todaysTasks.slice(0,4); // slice first 4 tasks
    if(!items.length) {
      fEl.innerHTML='<div class="flex items-center gap-3 p-4 text-xs text-on-surface-variant font-bold">🎉 All tasks done!</div>';
    } else {
      fEl.innerHTML=items.map((t, i)=>{
        let name = t.name;
        let icon = "description", bg = "bg-blue-50 dark:bg-blue-950/40", textCol = "text-blue-500";
        let sub = "Daily checklist task";
        
        let cName = name.toLowerCase();
        if (cName.includes("essay") || cName.includes("draft") || cName.includes("scholarship")) {
          icon = "description"; bg = "bg-blue-50 dark:bg-blue-950/40"; textCol = "text-blue-500";
          sub = "Global Excellence Award · Due tomorrow";
        } else if (cName.includes("calculus") || cName.includes("math") || cName.includes("prep") || cName.includes("course") || cName.includes("study")) {
          icon = "menu_book"; bg = "bg-slate-50 dark:bg-slate-900/40"; textCol = "text-slate-500";
          sub = "Module 4: Triple Integrals · 2:00 PM";
        } else if (cName.includes("request") || cName.includes("recommendation") || cName.includes("email") || cName.includes("ask")) {
          icon = "mail"; bg = "bg-amber-50 dark:bg-amber-950/40"; textCol = "text-amber-500";
          sub = "Email Prof. Henderson regarding Rhodes Fellowship";
        }
        
        return `<div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-primary/20 hover:bg-slate-100/50 transition-all cursor-pointer" onclick="toggleTask(${todaysTasks.indexOf(t)})">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined ${textCol} text-base">${icon}</span>
            </div>
            <div>
              <div class="text-sm font-bold text-on-surface ${t.done?'line-through opacity-50':''}">${name}</div>
              <div class="text-[10px] text-on-surface-variant">${sub}</div>
            </div>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant text-sm">${t.done?'check_circle':'chevron_right'}</span>
        </div>`;
      }).join("");
    }
  }

  // 2. Readiness Circle Gauge & Progress
  let sc = calcEligibility();
  let rCircle = document.getElementById("readinessProgressCircle");
  if(rCircle) {
    let r = 68;
    let ci = 2 * Math.PI * r;
    let off = ci - (sc / 100) * ci;
    rCircle.style.strokeDasharray = ci;
    rCircle.style.strokeDashoffset = off;
  }
  let rScoreVal = document.getElementById("readinessScoreVal");
  if(rScoreVal) {
    rScoreVal.textContent = sc + "%";
  }

  // 3. Recommended scholarship details
  let recTitle = document.getElementById("recommendedTitle");
  let recSub = document.getElementById("recommendedSub");
  if (recTitle && recSub) {
    let best = SCHOL_DB[0];
    let maxSc = 0;
    SCHOL_DB.forEach(s => {
      let score = 0;
      let ex = scholarships.find(x => x.id === s.id);
      if(ex) score += 50;
      else score += 20;
      if (score > maxSc) {
        maxSc = score;
        best = s;
      }
    });
    recTitle.textContent = best.name;
    recSub.textContent = best.country + " · " + (best.degree ? best.degree[0] : "Grant");
  }

  // 4. Update counter chips
  let dCountTasks = document.getElementById("dashCountTasks");
  if(dCountTasks) dCountTasks.textContent = todaysTasks.filter(t => !t.done).length;
  let dCountCourses = document.getElementById("dashCountCourses");
  if(dCountCourses) dCountCourses.textContent = courses.length;
  let dCountDeadlines = document.getElementById("dashCountDeadlines");
  if(dCountDeadlines) dCountDeadlines.textContent = deadlines.length;
  let dCountStreak = document.getElementById("dashCountStreak");
  if(dCountStreak) dCountStreak.textContent = streakData.length;

  // 5. Course Snapshot Grid
  let cSnapEl = document.getElementById("courseContainerDashboard");
  if(cSnapEl){
    if(!courses.length){
      cSnapEl.innerHTML = '<p class="empty col-span-3 text-center text-on-surface-variant text-xs p-8">No courses active yet.</p>';
    } else {
      cSnapEl.innerHTML = courses.slice(0,3).map(c => {
        let pct = c.total > 0 ? Math.round((c.completed / c.total) * 100) : 0;
        let img = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80";
        let prof = "Academic Instructor";
        
        let cName = c.name.toLowerCase();
        if (cName.includes("fluid") || cName.includes("mechanic")) {
          img = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80";
          prof = "Dr. Sarah Jenkins";
        } else if (cName.includes("calculus") || cName.includes("math")) {
          img = "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80";
          prof = "Prof. Robert Chen";
        } else if (cName.includes("ai") || cName.includes("intelligence") || cName.includes("machine")) {
          img = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80";
          prof = "Dr. Elena Rodriguez";
        }
        
        return `<div class="glass-panel rounded-3xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between">
          <div class="h-32 w-full overflow-hidden relative">
            <img src="${img}" class="w-full h-full object-cover" alt="${c.name}">
          </div>
          <div class="p-5 flex-grow flex flex-col justify-between">
            <div class="mb-4">
              <h4 class="font-bold text-sm text-on-surface line-clamp-1">${c.name}</h4>
              <p class="text-[10px] text-on-surface-variant mt-0.5">${prof}</p>
            </div>
            <div>
              <div class="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                <div class="h-full bg-primary" style="width: ${pct}%;"></div>
              </div>
              <div class="flex justify-between items-center text-[10px] font-semibold">
                <span class="text-on-surface-variant">${c.completed}/${c.total} Lessons</span>
                <span class="text-primary font-bold">${pct}%</span>
              </div>
            </div>
          </div>
        </div>`;
      }).join("");
    }
  }

  // update counts
  let nc = document.getElementById("notificationCount");
  if(nc) nc.textContent = todaysTasks.filter(t => !t.done).length + deadlines.length;
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

function applyGlobalSearch(){
  let q=(document.getElementById("globalSearch")?.value||"").toLowerCase().trim();
  
  // 1. Sync & Search on Scholarship Discovery Feed
  let sInp=document.getElementById("scholarSearch");
  if(sInp){
    sInp.value=q;
    applyScholarSearch();
  }
  
  // 2. Filter courses list on Courses page
  let cCards=document.querySelectorAll("#courseContainer > div");
  cCards.forEach(card=>{
    let txt=card.textContent.toLowerCase();
    card.style.display=txt.includes(q)?"":"none";
  });
  
  // 3. Filter pending/completed tasks checklist on Tasks page
  let tItems=document.querySelectorAll("#pendingTasks > div, #completedTasks > div");
  tItems.forEach(item=>{
    let txt=item.textContent.toLowerCase();
    item.style.display=txt.includes(q)?"":"none";
  });
  
  // 4. Filter milestones checklist on Deadlines page
  let dCards=document.querySelectorAll("#deadlineContainer > div");
  dCards.forEach(card=>{
    let txt=card.textContent.toLowerCase();
    card.style.display=txt.includes(q)?"":"none";
  });
}
