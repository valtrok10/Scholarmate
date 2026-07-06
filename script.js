// ============================================================
//   SCHOLARMATE AI — SCRIPT.JS v4
//   AI tasks, auto-tick requirements, overall readiness
// ============================================================
const SCHOLARSHIP_DB = [
  // ── JAPAN ──────────────────────────────────────────────────
  { id:"mext", name:"MEXT Scholarship", country:"Japan", flag:"🇯🇵",
    degree:["Bachelor","Master","PhD"], category:["STEM","Arts","Humanities"],
    amount:"Full fund + stipend", deadline:"2027-02-28", link:"https://www.mext.go.jp",
    requirements:["Application Form","Transcript","Research Proposal","Recommendation Letter","Passport","English/Japanese Proficiency"],
    desc:"Japanese government scholarship for undergraduate and postgraduate studies." },
  { id:"jasso", name:"JASSO Scholarship", country:"Japan", flag:"🇯🇵",
    degree:["Master","PhD"], category:["All fields"],
    amount:"¥143,000/month", deadline:"2027-04-30", link:"https://www.jasso.or.jp",
    requirements:["Academic records","Research plan","Japanese proficiency","Recommendation"],
    desc:"Japan Student Services Organization scholarship for research students." },

  // ── SOUTH KOREA ────────────────────────────────────────────
  { id:"gks", name:"GKS (Global Korea Scholarship)", country:"South Korea", flag:"🇰🇷",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"Full tuition + monthly stipend", deadline:"2027-03-15", link:"https://www.niied.go.kr",
    requirements:["Personal Statement","Study Plan","TOPIK/IELTS","Recommendation Letter","Passport","Medical Report"],
    desc:"Fully funded Korean government scholarship covering all study levels." },
  { id:"kgsp", name:"KGSP Undergraduate", country:"South Korea", flag:"🇰🇷",
    degree:["Bachelor"], category:["All fields"],
    amount:"Full fund", deadline:"2027-03-01", link:"https://www.niied.go.kr",
    requirements:["Transcript","Language cert","Recommendation","Medical"],
    desc:"Korean government scholarship for undergraduate international students." },

  // ── GERMANY ────────────────────────────────────────────────
  { id:"daad", name:"DAAD Scholarship", country:"Germany", flag:"🇩🇪",
    degree:["Master","PhD"], category:["Engineering","STEM","Arts","Humanities"],
    amount:"€934/month", deadline:"2027-04-20", link:"https://www.daad.de",
    requirements:["CV","Motivation Letter","Transcript","Work Experience","Passport"],
    desc:"German Academic Exchange Service — world's largest scholarship organization." },
  { id:"konrad", name:"Konrad-Adenauer Scholarship", country:"Germany", flag:"🇩🇪",
    degree:["Master","PhD"], category:["Social Sciences","Humanities","Law"],
    amount:"€850/month + travel", deadline:"2027-01-15", link:"https://www.kas.de",
    requirements:["Academic record","Essay","Interview","Recommendation"],
    desc:"For high-achieving students with social/political engagement." },
  { id:"heinrich", name:"Heinrich Böll Scholarship", country:"Germany", flag:"🇩🇪",
    degree:["Bachelor","Master","PhD"], category:["Arts","Social Sciences","STEM"],
    amount:"€850/month", deadline:"2027-03-01", link:"https://www.boell.de",
    requirements:["Application form","CV","Motivation letter","Recommendation"],
    desc:"Green political foundation scholarship for socially engaged students." },

  // ── UK ─────────────────────────────────────────────────────
  { id:"chevening", name:"Chevening Scholarship", country:"United Kingdom", flag:"🇬🇧",
    degree:["Master"], category:["All fields"],
    amount:"Full fund + living stipend", deadline:"2027-11-05", link:"https://www.chevening.org",
    requirements:["Essay Questions","Work Experience (2yrs)","Recommendation Letter","Passport","IELTS"],
    desc:"UK government global scholarship for future leaders." },
  { id:"commonwealth", name:"Commonwealth Scholarship", country:"United Kingdom", flag:"🇬🇧",
    degree:["Master","PhD"], category:["Development","STEM","Humanities"],
    amount:"Full tuition + flights + stipend", deadline:"2027-12-15", link:"https://cscuk.fcdo.gov.uk",
    requirements:["Academic record","Research proposal","References","Development impact statement"],
    desc:"For students from Commonwealth countries to study in the UK." },
  { id:"gates", name:"Gates Cambridge Scholarship", country:"United Kingdom", flag:"🇬🇧",
    degree:["Master","PhD"], category:["All fields"],
    amount:"Full Cambridge fees + stipend", deadline:"2027-10-15", link:"https://www.gatescambridge.org",
    requirements:["Academic excellence","Leadership evidence","Research proposal","References"],
    desc:"Gates Foundation scholarship for study at University of Cambridge." },
  { id:"rhodes", name:"Rhodes Scholarship", country:"United Kingdom", flag:"🇬🇧",
    degree:["Master","PhD"], category:["All fields"],
    amount:"Full Oxford fees + living costs", deadline:"2027-08-01", link:"https://www.rhodeshouse.ox.ac.uk",
    requirements:["Academic record","Leadership","Community service","Interview","References"],
    desc:"World's oldest and most prestigious international scholarship at Oxford." },

  // ── EUROPE ─────────────────────────────────────────────────
  { id:"erasmus", name:"Erasmus+ Scholarship", country:"Europe (EU)", flag:"🇪🇺",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"€700–1400/month", deadline:"2027-01-31", link:"https://erasmus-plus.ec.europa.eu",
    requirements:["Passport","Transcript","Motivation Letter","Language Certificate"],
    desc:"EU flagship programme for international study, training and volunteering." },
  { id:"eiffel", name:"Eiffel Excellence Scholarship", country:"France", flag:"🇫🇷",
    degree:["Master","PhD"], category:["Engineering","Economics","Law","Political Science"],
    amount:"€1,181/month", deadline:"2027-01-12", link:"https://www.campusfrance.org",
    requirements:["Academic excellence","French/English proficiency","Nomination by university"],
    desc:"French Ministry of Europe and Foreign Affairs excellence scholarship." },
  { id:"netherlands", name:"Holland Scholarship", country:"Netherlands", flag:"🇳🇱",
    degree:["Bachelor","Master"], category:["All fields"],
    amount:"€5,000 one-time", deadline:"2027-02-01", link:"https://www.studyinholland.nl",
    requirements:["Academic record","Motivation letter","Language cert"],
    desc:"Dutch universities scholarship for students outside the EEA." },
  { id:"sweden", name:"Swedish Institute Scholarship", country:"Sweden", flag:"🇸🇪",
    degree:["Master"], category:["All fields"],
    amount:"Full tuition + SEK 11,000/month", deadline:"2027-02-10", link:"https://si.se",
    requirements:["Work experience","Leadership","Academic merit","English proficiency"],
    desc:"For students with leadership potential and professional experience." },
  { id:"vlir", name:"VLIR-UOS Scholarship", country:"Belgium", flag:"🇧🇪",
    degree:["Master","PhD"], category:["Development","Science","Technology"],
    amount:"Full fund + travel", deadline:"2027-02-15", link:"https://www.vliruos.be",
    requirements:["Academic record","Motivation","Professional experience","References"],
    desc:"Belgian development cooperation scholarship for students from Global South." },

  // ── USA ────────────────────────────────────────────────────
  { id:"fulbright", name:"Fulbright Scholarship", country:"United States", flag:"🇺🇸",
    degree:["Master","PhD"], category:["All fields"],
    amount:"Full fund + stipend", deadline:"2027-10-15", link:"https://foreign.fulbrightonline.org",
    requirements:["Academic record","Essays","References","English proficiency","Interview"],
    desc:"US government flagship international exchange scholarship." },
  { id:"hubert", name:"Hubert H. Humphrey Fellowship", country:"United States", flag:"🇺🇸",
    degree:["Professional"], category:["Leadership","Public Policy","Development"],
    amount:"Full fund + travel + stipend", deadline:"2027-10-01", link:"https://www.humphreyfellowship.org",
    requirements:["Professional experience","Leadership","English","References"],
    desc:"Non-degree fellowship for mid-career professionals." },

  // ── AUSTRALIA ──────────────────────────────────────────────
  { id:"australia", name:"Australia Awards Scholarship", country:"Australia", flag:"🇦🇺",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"Full tuition + living + flights", deadline:"2027-04-30", link:"https://www.dfat.gov.au",
    requirements:["Academic record","Professional experience","English","Leadership evidence"],
    desc:"Australian government scholarship promoting development through education." },
  { id:"endeavour", name:"Destination Australia", country:"Australia", flag:"🇦🇺",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"AUD 15,000/year", deadline:"2027-07-31", link:"https://www.destinationaustralia.gov.au",
    requirements:["Academic merit","English","Enrollment in regional university"],
    desc:"For international students studying at regional Australian universities." },

  // ── CANADA ─────────────────────────────────────────────────
  { id:"vanier", name:"Vanier Canada Graduate Scholarship", country:"Canada", flag:"🇨🇦",
    degree:["PhD"], category:["Health","Natural Sciences","Social Sciences","Humanities"],
    amount:"CAD 50,000/year (3 years)", deadline:"2027-11-01", link:"https://vanier.gc.ca",
    requirements:["Academic excellence","Research potential","Leadership","References"],
    desc:"Canada's most prestigious doctoral scholarship." },
  { id:"ontario", name:"Ontario Graduate Scholarship", country:"Canada", flag:"🇨🇦",
    degree:["Master","PhD"], category:["All fields"],
    amount:"CAD 10,000–15,000/year", deadline:"2027-02-28", link:"https://osap.gov.on.ca",
    requirements:["Academic record","Research proposal","References"],
    desc:"Ontario government merit-based graduate scholarship." },

  // ── CHINA ──────────────────────────────────────────────────
  { id:"csc", name:"Chinese Government Scholarship (CSC)", country:"China", flag:"🇨🇳",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"Full tuition + stipend + accommodation", deadline:"2027-04-30", link:"https://www.campuschina.org",
    requirements:["Academic record","Medical report","No criminal record","Language cert"],
    desc:"Ministry of Education China scholarship for international students." },
  { id:"chinese_prov", name:"Provincial Government Scholarship", country:"China", flag:"🇨🇳",
    degree:["Bachelor","Master"], category:["All fields"],
    amount:"Tuition + stipend (varies)", deadline:"2027-05-31", link:"https://www.campuschina.org",
    requirements:["Academic record","Application form","References"],
    desc:"Individual Chinese provincial government scholarships." },

  // ── TURKEY ─────────────────────────────────────────────────
  { id:"turkiye", name:"Türkiye Burslari Scholarship", country:"Turkey", flag:"🇹🇷",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"Full tuition + monthly stipend + accommodation", deadline:"2027-02-20", link:"https://www.turkiyeburslari.gov.tr",
    requirements:["Academic record","Motivation letter","No previous Turkey study","Age limit"],
    desc:"Turkish government full scholarship — one of the world's most competitive." },

  // ── SINGAPORE ──────────────────────────────────────────────
  { id:"singa", name:"SINGA Scholarship", country:"Singapore", flag:"🇸🇬",
    degree:["PhD"], category:["Engineering","Biomedical","Physical Sciences"],
    amount:"Full tuition + monthly stipend + settling-in allowance", deadline:"2027-06-01", link:"https://www.singa.a-star.edu.sg",
    requirements:["Academic excellence","Research aptitude","References","Interview"],
    desc:"Singapore International Graduate Award for PhD research." },
  { id:"nus_scholarship", name:"NUS Research Scholarship", country:"Singapore", flag:"🇸🇬",
    degree:["PhD"], category:["STEM","Business","Humanities"],
    amount:"Full tuition + SGD 2,000/month", deadline:"2027-11-30", link:"https://nus.edu.sg",
    requirements:["First class degree","Research proposal","References"],
    desc:"National University of Singapore doctoral scholarship." },

  // ── UAE ────────────────────────────────────────────────────
  { id:"kaust", name:"KAUST Fellowship", country:"Saudi Arabia", flag:"🇸🇦",
    degree:["Master","PhD"], category:["STEM","Engineering","Bioscience"],
    amount:"Full fund + SAR 30,000/year living", deadline:"2027-01-15", link:"https://www.kaust.edu.sa",
    requirements:["STEM degree","English","Research proposal","References","GRE optional"],
    desc:"King Abdullah University scholarship in science and technology." },

  // ── SOUTH AMERICA ──────────────────────────────────────────
  { id:"brazil", name:"LASPAU Brazil Scientific Mobility", country:"Brazil", flag:"🇧🇷",
    degree:["Bachelor","Master"], category:["STEM"],
    amount:"Full tuition + living costs", deadline:"2027-05-01", link:"https://laspau.harvard.edu",
    requirements:["GPA 3.0+","English/Portuguese","STEM enrollment","No previous abroad study"],
    desc:"Brazilian government STEM exchange scholarship." },

  // ── NORWAY ─────────────────────────────────────────────────
  { id:"norway", name:"Norwegian Government Scholarship", country:"Norway", flag:"🇳🇴",
    degree:["Master","PhD"], category:["All fields"],
    amount:"NOK 11,300/month", deadline:"2027-03-01", link:"https://www.siu.no",
    requirements:["Academic record","Research plan","Norwegian/English proficiency"],
    desc:"Quota scheme for students from developing countries to study in Norway." },

  // ── SWITZERLAND ────────────────────────────────────────────
  { id:"swiss", name:"Swiss Government Excellence Scholarship", country:"Switzerland", flag:"🇨🇭",
    degree:["Master","PhD","Postdoc"], category:["All fields"],
    amount:"CHF 1,920/month", deadline:"2026-12-01", link:"https://www.sbfi.admin.ch",
    requirements:["Academic excellence","Research proposal","Age limit (35 for PhD)","References"],
    desc:"Swiss Confederation scholarships for foreign scholars and artists." },

  // ── HUNGARY ────────────────────────────────────────────────
  { id:"hungary", name:"Stipendium Hungaricum", country:"Hungary", flag:"🇭🇺",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"Full tuition + monthly stipend + accommodation", deadline:"2027-01-15", link:"https://stipendiumhungaricum.hu",
    requirements:["Academic record","Language cert","Application form","Motivation letter"],
    desc:"Hungarian government scholarship open to students from 80+ partner countries." },

  // ── RUSSIA ─────────────────────────────────────────────────
  { id:"russia", name:"Russian Government Scholarship", country:"Russia", flag:"🇷🇺",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"Full tuition + stipend + accommodation", deadline:"2027-04-01", link:"https://russia.edu.ru",
    requirements:["Academic record","Russian/English proficiency","Medical certificate"],
    desc:"Russian government scholarship for international students." },

  // ── INDIA ──────────────────────────────────────────────────
  { id:"iccr", name:"ICCR Scholarship", country:"India", flag:"🇮🇳",
    degree:["Bachelor","Master","PhD"], category:["All fields"],
    amount:"Full tuition + monthly stipend", deadline:"2027-05-31", link:"https://a2ascholarships.iccr.gov.in",
    requirements:["Academic record","Application form","Medical","No previous India scholarship"],
    desc:"Indian Council for Cultural Relations scholarship for international students." },
];
// ── STATE ─────────────────────────────────────────────────────
let courses=[], todaysTasks=[], scholarships=[], deadlines=[];
let studyData=[0,0,0,0,0,0,0], streakData=[], studyHistory=[];
let userXP=0, username="", darkMode=true;
let selectedScholarship=null;

// ── HELPERS ────────────────────────────────────────────────────
function showNotif(text, type="info"){
  let el=document.getElementById("notificationContainer"); if(!el)return;
  let n=document.createElement("div");
  n.className="notification"+(type==="urgent"?" urgent":type==="warn"?" warn":type==="streak"?" streak":"");
  n.textContent=text; el.appendChild(n);
  setTimeout(()=>n.remove(),3500);
}
function showNotification(text){ showNotif(text); }
function toggleSidebar(){
  document.querySelector(".sidebar").classList.toggle("open");
  document.getElementById("sidebarOverlay")?.classList.toggle("show");
}

function saveYtKey(){
  let inp=document.getElementById("ytApiKeyInput"); if(!inp||!inp.value.trim())return;
  localStorage.setItem("yt_api_key", inp.value.trim());
  // update courseTracker key
  if(typeof YOUTUBE_API_KEY !== 'undefined') window._ytKey = inp.value.trim();
  showNotif("✅ YouTube API key saved","success");
}
function animateCount(el,target,dur=700){
  if(!el)return; let s=0,step=target/((dur/16));
  let t=setInterval(()=>{ s=Math.min(s+step,target); el.textContent=Math.round(s); if(s>=target)clearInterval(t); },16);
}

// ── SAVE ──────────────────────────────────────────────────────
let _st=null;
function saveData(){ clearTimeout(_st); _st=setTimeout(()=>saveUserData(),700); }

// ── PAGE SWITCH ───────────────────────────────────────────────
function showPage(id, navEl){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("activePage"));
  document.querySelectorAll(".navItem").forEach(n=>n.classList.remove("active"));
  let p=document.getElementById(id); if(p) p.classList.add("activePage");
  if(navEl) navEl.classList.add("active");
  if(id==="dashboardPage")    renderDashboard();
  if(id==="taskPage")         showTodayTasks();
  if(id==="coursePage")       { showCourses(); renderCourseMeters(); }
  if(id==="scholarPage")      renderScholarshipPage();
  if(id==="productivityPage") { drawChart(); generateTimeline(); generateStreakCalendar(); renderStudyHistory(); renderProductivityScore(); }
  if(id==="aiPage")           renderAISidebar();
  if(id==="settingsPage")     updateProfileDisplay();
}
function toggleSidebar(){ document.querySelector(".sidebar").classList.toggle("open"); }

// ── COURSES ───────────────────────────────────────────────────
function addCourse(){
  let name=document.getElementById("courseName").value.trim();
  let link=document.getElementById("courseLink").value.trim();
  let total=parseInt(document.getElementById("courseTotal").value);
  if(!name||!link||!total){ alert("Fill all fields"); return; }

  let platform="other";
  if(link.includes("youtube.com")||link.includes("youtu.be")) platform="youtube";
  else if(link.includes("udemy.com")) platform="udemy";
  else if(link.includes("coursera"))  platform="coursera";

  courses.push({ name, link, platform, total, completed:0, lastLesson:"", lastStudied:null, videos:[], playlistId:null });
  ["courseName","courseLink","courseTotal"].forEach(id=>{let e=document.getElementById(id);if(e)e.value="";});
  generateTodayTasks(); showCourses(); renderCourseMeters(); saveData(); refreshDashboard();
  showNotif("📚 Course added","success");
}

function showCourses(){
  let el=document.getElementById("courseContainer"); if(!el)return;
  if(courses.length===0){ el.innerHTML='<p class="emptyState">No courses yet — add one above.</p>'; return; }
  el.innerHTML=courses.map((c,i)=>{
    let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
    let pctCls=pct>=75?"green":pct>=40?"amber":"blue";
    let pb=({youtube:'<span class="platformBadge yt">▶ YouTube</span>',
              udemy:  '<span class="platformBadge ud">Udemy</span>',
              coursera:'<span class="platformBadge co">Coursera</span>'})[c.platform]||'<span class="platformBadge ot">🔗 Course</span>';
    let nextLesson=c.lastLesson
      ?`<div class="continueBadge">📍 Last: ${c.lastLesson}</div>`
      :`<div class="continueBadge newBadge">🆕 Start learning</div>`;
    return `<div class="courseCard animated delay-${Math.min(i+1,4)}">
      <div class="courseCardTop"><div>${pb}<h3>${c.name}</h3></div>
        <span class="coursePct ${pctCls}">${pct}%</span></div>
      <div class="lessonProgress">
        <div class="courseBarTrack"><div class="courseBarFill ${pctCls}Fill" style="width:${pct}%"></div></div>
        <span class="lessonCount">${c.completed}/${c.total}</span>
      </div>
      ${nextLesson}
      ${c.lastStudied?`<span class="courseMeta">Last studied: ${c.lastStudied}</span>`:""}
      <div class="courseCardBtns">
        <button class="btnGreen" onclick="completeLessonWithTracking(${i})">✓ Done</button>
        <button class="btnBlue"  onclick="resumeCourse(${i})">▶ Continue</button>
        <button class="btnGhost" onclick="undoLesson(${i})">↺</button>
        <button class="btnGhost" onclick="editCourse(${i})">✏</button>
        <button class="btnRed"   onclick="deleteCourse(${i})">🗑</button>
      </div></div>`;
  }).join("");
}

function completeLessonWithTracking(i){
  let c=courses[i]; if(!c||c.completed>=c.total)return;
  let lessonNum=c.completed+1;
  let name=prompt(`What did you study?`,`Lesson ${lessonNum}`);
  if(name===null)return;
  if(!name) name=`Lesson ${lessonNum}`;
  c.completed++; c.lastLesson=name;
  c.lastStudied=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short"});
  // advance link to next chapter if youtube playlist
  if(c.playlistId && c.completed<c.total){
    c.link=`https://www.youtube.com/watch?v=&list=${c.playlistId}&index=${c.completed+1}`;
  }
  studyHistory.unshift({date:new Date().toISOString().split("T")[0],courseName:c.name,lesson:name,lessonNum});
  if(studyHistory.length>100)studyHistory.pop();
  addXP(20); autoTickScholarshipRequirements();
  generateTodayTasks(); showCourses(); renderCourseMeters(); saveData(); refreshDashboard();
  let pct=Math.round((c.completed/c.total)*100);
  showNotif(`✅ ${name} done! ${pct}% · +20 XP`,"success");
  if(c.completed<c.total){ let next=`Lesson ${c.completed+1}`; setTimeout(()=>showNotif(`▶ Next: ${next}`),1600); }
}
function undoLesson(i){ if(courses[i].completed>0)courses[i].completed--; generateTodayTasks();showCourses();renderCourseMeters();saveData();refreshDashboard(); }
function resumeCourse(i){ let c=courses[i]; if(c)window.open(c.link,"_blank"); }
function deleteCourse(i){ if(!confirm(`Delete "${courses[i].name}"?`))return; courses.splice(i,1);generateTodayTasks();showCourses();renderCourseMeters();saveData();refreshDashboard(); }
function editCourse(i){
  let n=prompt("Name",courses[i].name),l=prompt("Link",courses[i].link),t=prompt("Total",courses[i].total);
  if(n&&l&&t){courses[i].name=n;courses[i].link=l;courses[i].total=parseInt(t);showCourses();renderCourseMeters();saveData();refreshDashboard();}
}

// ── COURSE METERS ─────────────────────────────────────────────
function renderCourseMeters(){
  let el=document.getElementById("courseMeters"); if(!el)return;
  if(courses.length===0){el.className="courseMeterGrid";el.innerHTML='<p class="emptyState">Add a course to see meters.</p>';return;}
  let count=courses.length,mode=count<=3?"ring":count<=6?"ringSmall":"bar",size=mode==="ring"?110:75;
  el.className="courseMeterGrid"+(mode==="bar"?" bar":"");
  el.innerHTML=courses.map(c=>{
    let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
    return mode==="bar"?barMeter(c,pct):ringMeter(c,pct,size);
  }).join("");
}
function ringMeter(c,pct,sz){
  let r=(sz/2)-9,ci=2*Math.PI*r,off=ci-(pct/100)*ci,cx=sz/2;
  let col=pct>=75?"#10b981":pct>=40?"#f59e0b":"#22d3ee";
  return `<div class="courseMeter animated-s">
    <svg width="${sz}" height="${sz}">
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="8"></circle>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${col}" stroke-width="8"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cx})"
        style="stroke-dasharray:${ci};stroke-dashoffset:${off};transition:stroke-dashoffset 1s"></circle>
      <text x="${cx}" y="${cx+5}" text-anchor="middle" fill="${col}" font-size="${sz<90?11:13}" font-weight="700">${pct}%</text>
    </svg>
    <p class="meterLabel">${c.name}</p>
    ${c.lastLesson?`<p class="meterSub">📍 ${c.lastLesson}</p>`:""}
  </div>`;
}
function barMeter(c,pct){
  let col=pct>=75?"var(--green)":pct>=40?"var(--amber)":"var(--accentCyan)";
  return `<div class="courseBar animated">
    <div class="courseBarHeader"><span>${c.name}</span><span style="color:${col};font-weight:700">${pct}%</span></div>
    <div class="courseBarTrack"><div class="courseBarFill" style="width:${pct}%;background:${col}"></div></div>
    ${c.lastLesson?`<div class="barLastLesson">📍 ${c.lastLesson}</div>`:""}
  </div>`;
}

// ── AUTO-TICK SCHOLARSHIP REQUIREMENTS ────────────────────────
// When courses reach thresholds, auto-tick matching requirements
const autoTickRules = [
  { keywords:["transcript","academic record","academic records","grade"], threshold:0.4, label:"Course 40%+" },
  { keywords:["sop","personal statement","statement of purpose"],        threshold:0.6, label:"Course 60%+" },
  { keywords:["ielts","english proficiency","language cert","language certificate","topik"], threshold:0.5, label:"Course 50%+" },
  { keywords:["cv","curriculum vitae"],                                  threshold:0.3, label:"Course 30%+" },
  { keywords:["motivation letter","motivation","essay"],                 threshold:0.5, label:"Course 50%+" },
];

function autoTickScholarshipRequirements(){
  let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let ratio=tL>0?(dL/tL):0;
  let changed=false;
  scholarships.forEach(s=>{
    s.requirements.forEach(req=>{
      if(s.completed.includes(req))return;
      let rLower=req.toLowerCase();
      autoTickRules.forEach(rule=>{
        if(rule.keywords.some(k=>rLower.includes(k))&&ratio>=rule.threshold){
          if(!s.autoTicked) s.autoTicked={};
          if(!s.autoTicked[req]){
            s.completed.push(req);
            s.autoTicked[req]=rule.label;
            changed=true;
            showNotif(`✨ Auto-ticked: ${req} (${s.name})`,"success");
          }
        }
      });
    });
  });
  if(changed){ saveData(); showScholarships(); }
}

// ── TASKS ─────────────────────────────────────────────────────
function generateTodayTasks(){
  let prev={}; todaysTasks.forEach(t=>{prev[t.name]=t.done;});
  todaysTasks=[];
  courses.forEach(c=>{
    if(c.completed<c.total){
      let t1=`📚 ${c.name} — Lesson ${c.completed+1}`; todaysTasks.push({name:t1,done:prev[t1]||false,type:"course"});
      if(c.completed>0){let t2=`📝 Revise ${c.name}`;todaysTasks.push({name:t2,done:prev[t2]||false,type:"revise"});}
    }
  });
  scholarships.forEach(s=>{
    let pending=s.requirements.filter(r=>!s.completed.includes(r));
    if(pending.length>0){let t3=`🎓 ${s.name}: ${pending[0]}`;todaysTasks.push({name:t3,done:prev[t3]||false,type:"scholarship"});}
  });
  saveData();
}

// AI GENERATES FOCUS ITEMS based on scholarship + real data
function generateAIFocusItems(){
  let items=[];
  // 1. Urgent deadlines always first
  let sortedDL=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date));
  sortedDL.forEach(d=>{
    let days=Math.ceil((new Date(d.date)-new Date())/86400000);
    if(days<=7) items.push({text:`⏰ ${d.name} — ${days} days left!`,type:"deadline",ai:false});
  });
  // 2. Scholarship pending requirements (from selected/active scholarship)
  scholarships.forEach(s=>{
    let pending=s.requirements.filter(r=>!s.completed.includes(r));
    let done=s.completed.length, total=s.requirements.length;
    let pct=total>0?Math.round((done/total)*100):0;
    if(pending.length>0 && pct<100){
      items.push({text:`🎓 ${s.name}: Complete "${pending[0]}" (${pct}% done)`,type:"scholar",ai:true});
    }
  });
  // 3. Course lessons
  courses.forEach(c=>{
    if(c.completed<c.total){
      let pct=Math.round((c.completed/c.total)*100);
      let next=c.lastLesson?`after "${c.lastLesson}"`:"";
      items.push({text:`📚 ${c.name} ${next} — ${pct}% done`,type:"course",ai:true});
    }
  });
  // 4. streak warning
  let today=new Date().toISOString().split("T")[0];
  if(!streakData.includes(today) && new Date().getHours()>=12)
    items.push({text:`🔥 Study today to keep your ${streakData.length}-day streak!`,type:"streak",ai:true});
  return items.slice(0,5);
}

function showTodayTasks(){
  let pEl=document.getElementById("pendingTasks"),cEl=document.getElementById("completedTasks");
  let sumEl=document.getElementById("taskProgressSummary"),barEl=document.getElementById("reminderProgressFill");
  let pCt=document.getElementById("pendingCount"),cCt=document.getElementById("completedCount");
  if(!pEl||!cEl)return;
  pEl.innerHTML=""; cEl.innerHTML="";
  let done=todaysTasks.filter(t=>t.done).length,total=todaysTasks.length;
  let pct=total>0?Math.round((done/total)*100):0;
  if(pCt)pCt.textContent=total-done;
  if(cCt)cCt.textContent=done;
  if(sumEl)sumEl.textContent=`${done}/${total} tasks — ${pct}%`;
  if(barEl)barEl.style.width=pct+"%";
  todaysTasks.forEach((t,i)=>{
    let typeColor=t.type==="scholarship"?"border-color:rgba(99,102,241,.2)":t.type==="course"?"border-color:rgba(34,211,238,.15)":"";
    let html=`<div class="taskItem${t.done?" done":""}" style="${typeColor}">
      <input type="checkbox" class="taskCheck" ${t.done?"checked":""} onchange="toggleTask(${i})">
      <span>${t.name}</span>
    </div>`;
    if(t.done)cEl.innerHTML+=html; else pEl.innerHTML+=html;
  });
  if(!pEl.innerHTML)pEl.innerHTML='<p class="emptyState" style="color:var(--green)">🎉 All done!</p>';
}

function toggleTask(i){
  let was=todaysTasks[i].done; todaysTasks[i].done=!was;
  if(!was){addXP(10);updateStreak();showNotif("✅ Task done! +10 XP","success");autoTickScholarshipRequirements();}
  else{userXP=Math.max(0,userXP-10);showNotif("↩ Unchecked");}
  updateStudyData();saveData();showTodayTasks();refreshDashboard();
}

// ── SCHOLARSHIPS ──────────────────────────────────────────────
function renderScholarshipPage(){
  showScholarships();
  renderRecommendation();
  // populate country dropdown and show default results
  if(typeof SCHOLARSHIP_DB==="undefined") return;
  let cEl=document.getElementById("filterCountry");
  if(cEl&&cEl.options.length<=1){
    let countries=[...new Set(SCHOLARSHIP_DB.map(s=>stripEmoji(s.country).trim()))].filter(Boolean).sort();
    countries.forEach(ct=>{let o=document.createElement("option");o.value=ct;o.textContent=ct;cEl.appendChild(o);});
  }
  applyScholarshipSearch(); // show default 8 results
}

function stripEmoji(s){return(s||"").replace(/[^\u0000-\u007E\u00A0-\u024F\s]/g,"").trim();}

function applyScholarshipSearch(){
  let q=(document.getElementById("scholarSearch")?.value||"").toLowerCase().trim();
  let deg=document.getElementById("filterDegree")?.value||"";
  let cat=document.getElementById("filterCategory")?.value||"";
  let cty=document.getElementById("filterCountry")?.value||"";
  if(typeof SCHOLARSHIP_DB==="undefined"){return;}
  let results=SCHOLARSHIP_DB.filter(s=>{
    let cName=stripEmoji(s.country).toLowerCase();
    let matchQ=!q||[s.name,s.country,s.desc,...(s.category||[])].some(f=>stripEmoji(f||"").toLowerCase().includes(q));
    let matchDeg=!deg||(s.degree||[]).includes(deg);
    let matchCat=!cat||(s.category||[]).some(c=>c.toLowerCase().includes(cat.toLowerCase()));
    let matchCty=!cty||cName.includes(stripEmoji(cty).toLowerCase());
    return matchQ&&matchDeg&&matchCat&&matchCty;
  });
  let el=document.getElementById("searchResults"); if(!el)return;
  // show top 8 on page load even with no query
  if(!q&&!deg&&!cat&&!cty){results=SCHOLARSHIP_DB.slice(0,8);}
  if(results.length===0){el.innerHTML='<p class="emptyState">No scholarships match your search.</p>';return;}
  el.innerHTML=results.slice(0,10).map(s=>{
    let already=scholarships.some(x=>x.id===s.id);
    let days=Math.ceil((new Date(s.deadline)-new Date())/86400000);
    let urg=days<=30?"🔴":days<=90?"🟡":"🟢";
    return `<div class="searchResultCard">
      <div class="srcHeader">
        <span class="srcFlag">${s.flag}</span>
        <div class="srcInfo"><h4>${s.name}</h4><span class="srcCountry">${s.country}</span></div>
        <div class="srcRight">
          <span class="srcDeadline">${urg} ${days}d left</span>
          ${already?'<span class="srcAdded">✓ Added</span>':`<button class="btnSmall" onclick="addScholarshipFromDB('${s.id}')">+ Add</button>`}
        </div>
      </div>
      <p class="srcDesc">${s.desc}</p>
      <div class="srcTags">
        ${s.degree.map(d=>`<span class="tag">${d}</span>`).join("")}
        ${s.category.slice(0,2).map(c=>`<span class="tagCat tag">${c}</span>`).join("")}
        <span class="tag tagAmount">💰 ${s.amount}</span>
      </div>
    </div>`;
  }).join("");
}

function addScholarshipFromDB(id){
  let s=SCHOLARSHIP_DB.find(x=>x.id===id); if(!s)return;
  if(scholarships.some(x=>x.id===id)){showNotif("⚠ Already added");return;}
  scholarships.push({id:s.id,name:s.name,country:s.country,flag:s.flag,
    requirements:[...s.requirements],completed:[],expanded:false,deadline:s.deadline,amount:s.amount,autoTicked:{}});
  if(s.deadline&&!deadlines.some(d=>d.name===`${s.name} Application`))
    deadlines.push({name:`${s.name} Application`,date:s.deadline});
  // immediately run auto-tick + generate AI tasks for this scholarship
  autoTickScholarshipRequirements();
  generateAITasksForScholarship(s.id);
  generateTodayTasks(); saveData(); showScholarships();
  applyScholarshipSearch(); renderRecommendation(); refreshDashboard();
  showNotif(`🎓 ${s.name} added! AI updating your tasks...`,"success");
}

// Generate targeted tasks when a scholarship is added/selected
function generateAITasksForScholarship(scholarshipId){
  let s=scholarships.find(x=>x.id===scholarshipId); if(!s)return;
  let pending=s.requirements.filter(r=>!s.completed.includes(r));
  // Add specific scholarship tasks to today's tasks if not already there
  pending.slice(0,3).forEach(req=>{
    let tName=`🎓 ${s.name}: Prepare ${req}`;
    if(!todaysTasks.some(t=>t.name===tName)){
      todaysTasks.push({name:tName,done:false,type:"scholarship"});
    }
  });
  showNotif(`📋 Added ${Math.min(pending.length,3)} tasks for ${s.name}`,"success");
}

function showScholarships(){
  let el=document.getElementById("scholarshipContainer"); if(!el)return;
  if(scholarships.length===0){el.innerHTML='<p class="emptyState">No scholarships — search above.</p>';return;}
  el.innerHTML=scholarships.map((s,i)=>{
    let done=s.completed.length,total=s.requirements.length,pct=total>0?Math.round((done/total)*100):0;
    let days=s.deadline?Math.max(0,Math.ceil((new Date(s.deadline)-new Date())/86400000)):null;
    let urg=days!==null?(days<=30?"🔴":days<=90?"🟡":"🟢"):"";
    let reqHTML=s.requirements.map(r=>{
      let isAuto=s.autoTicked&&s.autoTicked[r];
      return `<div class="requirementItem ${isAuto?"autoTicked":""}">
        <input type="checkbox" class="scholarCheck" ${s.completed.includes(r)?"checked":""} onchange="toggleReq(${i},'${r.replace(/'/g,"\\'")}')">
        <span>${r}</span>
        ${isAuto?`<span class="autoTickBadge">✨ Auto: ${isAuto}</span>`:""}
      </div>`;
    }).join("");
    return `<div class="scholarCard animated-s">
      <div class="scholarCardHeader">
        <span class="scholarFlag">${s.flag||"🎓"}</span>
        <div><h3>${s.name}</h3>
          <p class="scholarMeta">${s.country}${days!==null?` · ${urg} ${days}d left`:""}</p>
        </div>
      </div>
      <div class="scholarProgress">
        <div class="scholarBar"><div class="scholarBarFill" style="width:${pct}%"></div></div>
        <span class="scholarPct">${done}/${total} requirements · ${pct}%</span>
      </div>
      <button class="scholarToggleBtn" onclick="toggleExpand(${i})">${s.expanded?"▼ Hide":"▶ Show"} requirements</button>
      ${s.expanded?`<div class="requirementList">${reqHTML}</div>`:""}
      <button class="btnDanger" onclick="deleteScholarship(${i})">🗑 Remove</button>
    </div>`;
  }).join("");
}

function toggleExpand(i){scholarships[i].expanded=!scholarships[i].expanded;saveData();showScholarships();}
function toggleReq(i,req){
  let s=scholarships[i];
  if(s.completed.includes(req)){s.completed=s.completed.filter(r=>r!==req);userXP=Math.max(0,userXP-10);showNotif("↩ Unchecked");}
  else{s.completed.push(req);addXP(10);showNotif("✅ Requirement done! +10 XP","success");}
  generateTodayTasks();saveData();showScholarships();refreshDashboard();
}
function deleteScholarship(i){if(!confirm(`Remove ${scholarships[i].name}?`))return;scholarships.splice(i,1);generateTodayTasks();saveData();showScholarships();refreshDashboard();}

function renderRecommendation(){
  let el=document.getElementById("recommendScholar"); if(!el)return;
  if(typeof SCHOLARSHIP_DB==="undefined"||!SCHOLARSHIP_DB.length){el.innerHTML='<p class="emptyState">Loading scholarship data...</p>';return;}
  let tL=0,dL=0; courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let cp=tL>0?(dL/tL)*100:0;
  let scored=SCHOLARSHIP_DB.map(s=>{
    let score=0,ex=scholarships.find(x=>x.id===s.id);
    if(ex)score+=(ex.completed.length/ex.requirements.length)*40;
    score+=cp*0.3+Math.min(streakData.length,30)*1.2+(Math.floor(userXP/100)+1)*2;
    score+=Math.random()*4;
    return{...s,matchScore:Math.min(99,Math.round(score))};
  }).sort((a,b)=>b.matchScore-a.matchScore);
  el.innerHTML=scored.slice(0,3).map((s,i)=>`
    <div class="recommendCard ${i===0?"topPick":""} animated delay-${i+1}">
      <div class="recLeft"><span class="recFlag">${s.flag}</span>
        <div><div class="recName">${i===0?"🏆 ":""}${s.name}</div>
          <div class="recCountry">${s.country} · ${s.degree.join(", ")}</div></div>
      </div>
      <div class="recScore">
        <div class="recPct" style="color:${i===0?"var(--green)":i===1?"var(--accentCyan)":"var(--textSub)"}">${s.matchScore}%</div>
        <div class="recLabel">match</div>
        ${scholarships.some(x=>x.id===s.id)
          ?'<div class="recTagAdded">✓ Added</div>'
          :`<button class="btnSmall" onclick="addScholarshipFromDB('${s.id}')">+ Add</button>`}
      </div>
    </div>`).join("");
}

// ── DEADLINES ─────────────────────────────────────────────────
function addDeadline(){
  let n=document.getElementById("deadlineName").value.trim(),d=document.getElementById("deadlineDate").value;
  if(!n||!d)return;
  deadlines.push({name:n,date:d});
  document.getElementById("deadlineName").value=""; document.getElementById("deadlineDate").value="";
  saveData();showDeadlines();refreshDashboard();
}
function showDeadlines(){
  let el=document.getElementById("deadlineContainer"); if(!el)return;
  if(deadlines.length===0){el.innerHTML='<p class="emptyState">No deadlines yet.</p>';return;}
  let sorted=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date));
  el.innerHTML=sorted.map((d,i)=>{
    let days=Math.max(0,Math.ceil((new Date(d.date)-new Date())/86400000));
    let cls=days<=3?"urgent":days<=14?"upcoming":"safe";
    return `<div class="planCard ${cls} animated delay-${Math.min(i+1,4)}">
      <div class="deadlineRow">
        <div><h3>${d.name}</h3><p>📅 ${d.date}</p></div>
        <div class="deadlineDays ${cls}">${days}d</div>
        <button class="btnIconRed" onclick="deleteDeadline(${i})">🗑</button>
      </div></div>`;
  }).join("");
}
function deleteDeadline(i){deadlines.splice(i,1);saveData();showDeadlines();refreshDashboard();}

// ── STREAK ────────────────────────────────────────────────────
function updateStreak(){
  let t=new Date().toISOString().split("T")[0];
  if(!streakData.includes(t))streakData.push(t);
  saveData();
}
function generateStreakCalendar(){
  let el=document.getElementById("streakCalendar"),lb=document.getElementById("streakLabel"); if(!el)return;
  el.innerHTML="";
  for(let i=29;i>=0;i--){
    let d=new Date();d.setDate(d.getDate()-i);
    let ds=d.toISOString().split("T")[0],box=document.createElement("div");
    box.className="dayBox"+(streakData.includes(ds)?" activeDay":"");box.title=ds;el.appendChild(box);
  }
  if(lb)lb.textContent=streakData.length+" days";
}

// ── CHART ─────────────────────────────────────────────────────
function updateStudyData(){
  let today=new Date().getDay(),done=todaysTasks.filter(t=>t.done).length,total=todaysTasks.length;
  studyData[today]=total>0?Math.round((done/total)*100):0; saveData();
}
function drawChart(){
  let canvas=document.getElementById("studyChart"); if(!canvas)return;
  if(window.chart){window.chart.data.datasets[0].data=studyData;window.chart.update();return;}
  window.chart=new Chart(canvas,{
    type:"bar",
    data:{labels:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      datasets:[{label:"Study %",data:studyData,
        backgroundColor:ctx=>{let g=ctx.chart.ctx.createLinearGradient(0,0,0,240);g.addColorStop(0,"rgba(34,211,238,.9)");g.addColorStop(1,"rgba(99,102,241,.5)");return g;},
        borderRadius:10,barThickness:34}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>` ${c.raw}%`}}},
      scales:{x:{grid:{color:"rgba(255,255,255,.04)"},ticks:{color:"rgba(255,255,255,.4)"}},
        y:{beginAtZero:true,max:100,ticks:{stepSize:25,color:"rgba(255,255,255,.4)"},grid:{color:"rgba(255,255,255,.04)"}}}}
  });
}

// ── PLANNER ───────────────────────────────────────────────────
function generateSchedule(){
  let h=parseInt(document.getElementById("studyHours")?.value);
  let plan=document.getElementById("studyPlan"); if(!plan)return;
  if(!h||h<=0){alert("Enter valid hours");return;}
  let pending=todaysTasks.filter(t=>!t.done);
  if(pending.length===0){plan.innerHTML='<div class="planCard">🎉 No pending tasks!</div>';return;}
  let mins=Math.round((h*60)/pending.length);
  plan.innerHTML=pending.map(t=>`<div class="planCard animated"><h3>📚 ${t.name}</h3><p>⏱ ~${mins} min</p></div>`).join("");
  document.getElementById("studyHours").value="";
}

// ── TIMELINE ──────────────────────────────────────────────────
function generateTimeline(){
  let el=document.getElementById("timelineContainer"); if(!el)return;
  let steps=[];
  let pending=todaysTasks.filter(t=>!t.done);
  if(pending.length>0)steps.push(`Complete: ${pending[0].name}`);
  scholarships.forEach(s=>{
    let p=s.requirements.filter(r=>!s.completed.includes(r));
    if(p.length>0)steps.push(`${s.name}: Prepare "${p[0]}"`);
  });
  let near=deadlines.length>0?[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
  if(near){let d=Math.ceil((new Date(near.date)-new Date())/86400000);steps.push(`Deadline: ${near.name} (${d} days)`);}
  let courseInProgress=courses.find(c=>c.completed>0&&c.completed<c.total);
  if(courseInProgress)steps.push(`Resume ${courseInProgress.name} — ${courseInProgress.lastLesson||"next lesson"}`);
  steps.push("Review today's progress & plan tomorrow ☕");
  el.innerHTML=steps.map((s,i)=>`
    <div class="timelineStep animated delay-${Math.min(i+1,4)}">
      <div class="timelineDot"></div>
      <div class="timelineContent"><span class="timelineNum">Step ${i+1}</span>${s}</div>
    </div>`).join("");
}

// ── STUDY HISTORY ─────────────────────────────────────────────
function renderStudyHistory(){
  let el=document.getElementById("studyHistoryContainer"); if(!el)return;
  let card=document.getElementById("studyHistoryCard");
  if(studyHistory.length===0){if(card)card.style.display="none";return;}
  if(card)card.style.display="block";
  el.innerHTML=studyHistory.slice(0,20).map(h=>`
    <div class="historyRow animated"><span class="histDate">${h.date}</span>
      <span class="histCourse">${h.courseName}</span>
      <span class="histLesson">${h.lesson}</span></div>`).join("");
}

// ── PRODUCTIVITY SCORE ─────────────────────────────────────────
function calcProductivityScore(){
  let score=0;
  let done=todaysTasks.filter(t=>t.done).length,total=todaysTasks.length;
  if(total>0)score+=(done/total)*30;
  let tL=0,dL=0;courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  if(tL>0)score+=(dL/tL)*30;
  score+=Math.min(streakData.length,30)*(20/30);
  let tR=0,dR=0;scholarships.forEach(s=>{tR+=s.requirements.length;dR+=s.completed.length;});
  if(tR>0)score+=(dR/tR)*20;
  return Math.round(score);
}
function renderProductivityScore(){
  let el=document.getElementById("productivityScoreBox"); if(!el)return;
  let score=calcProductivityScore();
  let label=score>=80?"Excellent 🚀":score>=60?"Good 📈":score>=40?"Moderate ⚡":"Building 🌱";
  let col=score>=80?"var(--green)":score>=60?"var(--accentCyan)":score>=40?"var(--amber)":"var(--red)";
  let done=todaysTasks.filter(t=>t.done).length,tL=0,dL=0;
  courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  el.innerHTML=`<div class="prodScoreWrap">
    <div class="prodScoreNum" style="-webkit-text-fill-color:${col}">${score}</div>
    <div class="prodScoreLabel">${label}</div>
    <div class="prodScoreBreak">
      <div class="prodRow"><span>Tasks today</span><span>${done}/${todaysTasks.length}</span></div>
      <div class="prodRow"><span>Course progress</span><span>${tL>0?Math.round((dL/tL)*100):0}%</span></div>
      <div class="prodRow"><span>Study streak</span><span>${streakData.length} days</span></div>
    </div></div>`;
}

// ── ELIGIBILITY ────────────────────────────────────────────────
function calcEligibility(){
  let score=0;
  let tL=0,dL=0;courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  if(tL>0)score+=(dL/tL)*40;
  let tR=0,dR=0;scholarships.forEach(s=>{tR+=s.requirements.length;dR+=s.completed.length;});
  if(tR>0)score+=(dR/tR)*30;
  score+=Math.min(streakData.length,30)*(20/30);
  let done=todaysTasks.filter(t=>t.done).length;
  if(todaysTasks.length>0)score+=(done/todaysTasks.length)*10;
  return Math.round(score);
}

// ── OVERALL READINESS (with breakdown) ────────────────────────
function calcReadinessBreakdown(){
  let tL=0,dL=0;courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let courseR=tL>0?Math.round((dL/tL)*100):0;
  let tR=0,dR=0;scholarships.forEach(s=>{tR+=s.requirements.length;dR+=s.completed.length;});
  let scholarR=tR>0?Math.round((dR/tR)*100):0;
  let streakR=Math.round(Math.min(streakData.length,30)*(100/30));
  let done=todaysTasks.filter(t=>t.done).length;
  let taskR=todaysTasks.length>0?Math.round((done/todaysTasks.length)*100):0;
  let deadlineR=100;
  deadlines.forEach(d=>{
    let days=Math.ceil((new Date(d.date)-new Date())/86400000);
    if(days<=3)deadlineR=Math.min(deadlineR,20);
    else if(days<=7)deadlineR=Math.min(deadlineR,60);
  });
  let overall=Math.round(courseR*.4+scholarR*.3+streakR*.2+taskR*.1);
  return{overall,courseR,scholarR,streakR,taskR,deadlineR};
}

// ── NOTIFICATIONS ──────────────────────────────────────────────
function showNotif(text,type="info"){
  let el=document.getElementById("notificationContainer"); if(!el)return;
  let n=document.createElement("div");
  n.className=`notification ${type}`;n.textContent=text;
  el.appendChild(n);setTimeout(()=>n.remove(),3400);
}
function updateNotifCount(){
  let el=document.getElementById("notificationCount");
  if(el)el.textContent=todaysTasks.filter(t=>!t.done).length+deadlines.length;
}
function checkProactiveNotifications(){
  let alerts=[];
  deadlines.forEach(d=>{
    let days=Math.ceil((new Date(d.date)-new Date())/86400000);
    if(days<=3)alerts.push({msg:`🔴 "${d.name}" in ${days} days!`,type:"urgent"});
    else if(days<=7)alerts.push({msg:`🟡 "${d.name}" coming up in ${days} days`,type:"warn"});
  });
  let today=new Date().toISOString().split("T")[0];
  if(!streakData.includes(today)&&new Date().getHours()>=18)
    alerts.push({msg:`🔥 Keep your ${streakData.length}-day streak! Do a task now.`,type:"streak"});
  let pending=todaysTasks.filter(t=>!t.done).length;
  if(pending>0)alerts.push({msg:`📌 ${pending} task${pending>1?"s":""} pending today`,type:"info"});
  alerts.slice(0,3).forEach((a,i)=>setTimeout(()=>showNotif(a.msg,a.type),i*2000));
}

// ── XP ─────────────────────────────────────────────────────────
function addXP(pts){userXP+=pts;showXP();}
function showXP(){
  let level=Math.floor(userXP/100)+1,xpInLevel=userXP%100;
  let xpEl=document.getElementById("xpDisplay"),lvEl=document.getElementById("topUserLevel");
  let bar=document.getElementById("xpMiniBar"),streakEl=document.getElementById("streakCount");
  if(xpEl){xpEl.textContent=userXP;xpEl.classList.add("animated-s");setTimeout(()=>xpEl.classList.remove("animated-s"),400);}
  if(lvEl)lvEl.innerHTML=`<span class="levelDot"></span> Level ${level}`;
  if(bar)bar.style.width=xpInLevel+"%";
  if(streakEl)streakEl.textContent=streakData.length;
  let dlvl=document.getElementById("userLevel");if(dlvl)dlvl.textContent="Level "+level;
}

// ── PROFILE ────────────────────────────────────────────────────
function applyTheme(){document.body.classList.toggle("lightMode",!darkMode);let t=document.getElementById("darkModeToggle");if(t)t.checked=darkMode;}
function toggleDarkMode(){let t=document.getElementById("darkModeToggle");darkMode=t?t.checked:!darkMode;applyTheme();saveData();}
function updateProfileDisplay(){
  let n=document.getElementById("userName");if(n)n.textContent=username||"User";
  let inp=document.getElementById("usernameInput");if(inp)inp.value=username;
}
function saveProfile(){
  let inp=document.getElementById("usernameInput");if(inp&&inp.value.trim())username=inp.value.trim();
  saveData();updateProfileDisplay();showNotif("✅ Profile saved","success");
}
function showQuote(){
  let el=document.getElementById("dailyQuote");if(!el)return;
  let q=["Success is built one step at a time.","Discipline beats motivation every time.","Small daily progress adds up to big results.","Be consistent — not perfect.","Your future self will thank you."];
  el.innerHTML=`<em>"${q[Math.floor(Math.random()*q.length)]}"</em>`;
}

// ── AI CHAT ────────────────────────────────────────────────────
const OPENROUTER_KEY= window.CONFIG.OPENROUTER_KEY;
function buildAIContext(){
  const OR_KEY = window.CONFIG.OPENROUTER_KEY;
  let tL=0,dL=0;courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let cp=tL>0?Math.round((dL/tL)*100):0;
  let tR=0,dR=0;scholarships.forEach(s=>{tR+=s.requirements.length;dR+=s.completed.length;});
  let sp=tR>0?Math.round((dR/tR)*100):0;
  let near=deadlines.length>0?[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
  let nearDays=near?Math.ceil((new Date(near.date)-new Date())/86400000):null;
  let breakdown=calcReadinessBreakdown();
  return `You are ScholarMate AI — a personal study & scholarship assistant.

STUDENT: ${username||"Student"} | Level ${Math.floor(userXP/100)+1} | XP: ${userXP} | Streak: ${streakData.length} days
OVERALL READINESS: ${breakdown.overall}%
COURSES (${cp}% overall):
${courses.map(c=>`  • ${c.name}: ${c.completed}/${c.total} (${c.total>0?Math.round((c.completed/c.total)*100):0}%) — last: ${c.lastLesson||"not started"}`).join("\n")||"  none"}
PENDING TASKS: ${todaysTasks.filter(t=>!t.done).map(t=>t.name).join(", ")||"none"}
SCHOLARSHIPS (${sp}% reqs done):
${scholarships.map(s=>{let p=s.requirements.filter(r=>!s.completed.includes(r));return`  • ${s.name}: ${s.completed.length}/${s.requirements.length} done. Pending: ${p.slice(0,2).join(", ")}`}).join("\n")||"  none"}
NEAREST DEADLINE: ${near?`${near.name} in ${nearDays} days`:"none"}
Rules: under 130 words, specific and actionable using the data above, never generic.`;
}
async function sendMessage(){
  let input=document.getElementById("chatInput"),text=input.value.trim(); if(!text)return;
  let chat=document.getElementById("chatContainer");
  if(executeAICommand(text)){input.value="";return;}
  chat.innerHTML+=`<div class="userMessage">${text}</div>`;
  chat.innerHTML+=`<div class="aiMessage" id="aiThinking"><span class="aiAvatar">🤖</span>Thinking...</div>`;
  chat.scrollTop=chat.scrollHeight; input.value="";
  try{

let res = await fetch(
"http://localhost:3000/chat",
{
method:"POST",

headers:{

"Authorization":
"Bearer "+window.CONFIG.OPENROUTER_KEY,

"Content-Type":
"application/json",

"HTTP-Referer":
window.location.origin,

"X-Title":
"ScholarMate"

},

body:JSON.stringify({

model:"deepseek/deepseek-chat",

messages:[

{
role:"system",
content:buildAIContext()
},

{
role:"user",
content:text
}

]

})

});

let data=await res.json();

console.log(data);

let t=document.getElementById(
"aiThinking"
);

if(t)t.remove();

let reply=

data.choices?.[0]
?.message?.content ||

data.error?.message ||

"AI failed";

chat.innerHTML+=
`<div class="aiMessage">
<span class="aiAvatar">🤖</span>
${reply}
</div>`;

chat.scrollTop=
chat.scrollHeight;

}
catch(e){

console.log(e);

let t=
document.getElementById(
"aiThinking"
);

if(t)t.remove();

chat.innerHTML+=
`<div class="aiMessage">
<span class="aiAvatar">🤖</span>
${e.message}
</div>`;

}}
function executeAICommand(text){
  let t=text.toLowerCase().trim();
  let map={tasks:"taskPage",courses:"coursePage",scholarships:"scholarPage",productivity:"productivityPage",settings:"settingsPage",deadlines:"deadlinePage"};
  for(let k in map)if(t.includes(k)){showPage(map[k]);showNotif("📍 "+k);return true;}
  return false;
}
function renderAISidebar(){
  let elig=calcEligibility(),breakdown=calcReadinessBreakdown();
  let eigEl=document.getElementById("eligibilityAI");
  if(eigEl){
    let col=elig>=70?"var(--green)":elig>=40?"var(--amber)":"var(--accentCyan)";
    eigEl.innerHTML=`<div style="text-align:center;padding:10px">
      <div style="font-size:36px;font-weight:900;color:${col}">${elig}%</div>
      <p style="font-size:12px;color:var(--textSub);margin-top:4px">Scholarship Readiness</p>
      <p style="font-size:11px;color:var(--textMuted);margin-top:6px">40% courses · 30% scholarships · 20% streak · 10% tasks</p>
    </div>`;
  }
  let tL=0,dL=0;courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
  let insEl=document.getElementById("aiInsights");
  if(insEl)insEl.innerHTML=[
    `✅ ${todaysTasks.filter(t=>t.done).length}/${todaysTasks.length} tasks today`,
    `📚 ${courses.length} courses · ${tL>0?Math.round((dL/tL)*100):0}% overall`,
    `🔥 ${streakData.length} day streak`,
    `⭐ ${userXP} XP · Level ${Math.floor(userXP/100)+1}`
  ].map(s=>`<div class="insightRow">${s}</div>`).join("");
  let sugEl=document.getElementById("suggestionsAI");
  if(sugEl){
    let tips=[],pending=todaysTasks.filter(t=>!t.done);
    if(pending.length>0)tips.push(`Focus: "${pending[0].name}"`);
    if(streakData.length<3)tips.push("Build a 3-day streak to unlock Consistency badge.");
    let near=deadlines.length>0?[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
    if(near){let d=Math.ceil((new Date(near.date)-new Date())/86400000);if(d<=14)tips.push(`⚠ "${near.name}" in ${d} days!`);}
    scholarships.forEach(s=>{let p=s.requirements.filter(r=>!s.completed.includes(r));if(p.length>0)tips.push(`${s.name}: next step → "${p[0]}"`)});
    if(tips.length===0)tips.push("Great progress! Keep the streak going 🚀");
    sugEl.innerHTML=tips.map(t=>`<div class="insightRow">💡 ${t}</div>`).join("");
  }
}

// ── DASHBOARD RENDER ───────────────────────────────────────────
function renderDashboard(){
  // AI-generated focus items
  let fEl=document.getElementById("todayFocus");
  if(fEl){
    let items=generateAIFocusItems();
    let typeClass={deadline:"focusItemDeadline",scholar:"focusItemScholar",streak:"",course:"",info:""};
    fEl.innerHTML=items.length
      ?items.map((t,i)=>`<div class="focusItem ${typeClass[t.type]||""} animated delay-${Math.min(i+1,4)}">
          <span class="focusDot"></span>${t.text}
          ${t.ai?'<span class="aiGeneratedBadge">AI</span>':""}
        </div>`).join("")
      :'<div class="focusItem animated"><span class="focusDot" style="background:var(--green)"></span>🎉 All done today!</div>';
  }
  // Quick Status
  let qs=document.getElementById("quickStatus");
  if(qs){
    let done=todaysTasks.filter(t=>t.done).length;
    qs.innerHTML=`
      <div class="quickStat animated"><div class="qs-icon">✅</div><div class="qs-label">Tasks</div><div class="qs-value">${done}/${todaysTasks.length}</div></div>
      <div class="quickStat animated delay-1"><div class="qs-icon">📚</div><div class="qs-label">Courses</div><div class="qs-value">${courses.length}</div></div>
      <div class="quickStat animated delay-2"><div class="qs-icon">⏳</div><div class="qs-label">Deadlines</div><div class="qs-value">${deadlines.length}</div></div>
      <div class="quickStat animated delay-3"><div class="qs-icon">🔥</div><div class="qs-label">Streak</div><div class="qs-value">${streakData.length}</div></div>`;
  }
  // AI Suggestion
  let aiEl=document.getElementById("aiSuggestionDashboard");
  if(aiEl){
    let pending=todaysTasks.filter(t=>!t.done);
    let tL=0,dL=0;courses.forEach(c=>{tL+=c.total;dL+=c.completed;});
    let cp=tL>0?Math.round((dL/tL)*100):0;
    let near=deadlines.length>0?[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
    let nearDays=near?Math.ceil((new Date(near.date)-new Date())/86400000):null;
    let msg;
    if(nearDays!==null&&nearDays<=7)msg=`⚠ "${near.name}" is in ${nearDays} days — prioritise it today.`;
    else if(pending.length>0)msg=`${pending.length} tasks pending. Start with: "${pending[0].name}"`;
    else if(cp>0)msg=`Course progress at ${cp}%. Keep going — consistency is everything!`;
    else msg="Add a course or scholarship to get personalised suggestions.";
    aiEl.innerHTML=`<div class="aiSuggBox animated">🤖 ${msg}</div>`;
  }
  // Course Snapshot
  let csEl=document.getElementById("courseDashboard");
  if(csEl){
    if(courses.length===0)csEl.innerHTML='<p class="emptyState">No courses yet.</p>';
    else csEl.innerHTML=`<div class="courseSnap">${courses.slice(0,3).map(c=>{
      let pct=c.total>0?Math.round((c.completed/c.total)*100):0;
      return`<div class="courseSnapItem"><div class="courseSnapName">${c.name}${c.lastLesson?`<span class="continueTag">▶ ${c.lastLesson}</span>`:""}</div>
        <div class="courseSnapBar"><div class="courseSnapFill" style="width:${pct}%"></div></div>
        <div class="courseSnapPct">${pct}%</div></div>`;
    }).join("")}</div>`;
  }
  // Eligibility ring
  let eigEl=document.getElementById("eligibilityDashboard");
  if(eigEl){
    let score=calcEligibility(),r=38,ci=2*Math.PI*r,off=ci-(score/100)*ci;
    let col=score>=70?"var(--green)":score>=40?"var(--amber)":"var(--accent)";
    eigEl.innerHTML=`<div class="eligRing">
      <svg width="90" height="90"><circle cx="45" cy="45" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="8"></circle>
        <circle cx="45" cy="45" r="${r}" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round"
          transform="rotate(-90 45 45)" style="stroke-dasharray:${ci};stroke-dashoffset:${off};transition:stroke-dashoffset 1s"></circle>
      </svg>
      <div class="eligCenter"><span class="eligPercent">${score}%</span><span class="eligLabel">Ready</span></div>
    </div>
    <span class="eligStatus" style="color:${col}">${score>=70?"High":score>=40?"Medium":"Low"}</span>`;
  }
  // Task Snapshot
  let tsEl=document.getElementById("taskSnapshotDash");
  if(tsEl){
    let done=todaysTasks.filter(t=>t.done).length,rem=todaysTasks.length-done;
    tsEl.innerHTML=`<div class="taskSnapGrid">
      <div class="taskSnapRow"><span>Completed</span><span class="taskSnapCount green">${done}</span></div>
      <div class="taskSnapRow"><span>Remaining</span><span class="taskSnapCount amber">${rem}</span></div>
    </div>`;
  }
  // Deadline Alert
  let dlEl=document.getElementById("deadlineDashboard");
  if(dlEl){
    if(deadlines.length===0)dlEl.innerHTML='<p class="emptyState">No upcoming deadlines 🎉</p>';
    else{
      let sorted=[...deadlines].sort((a,b)=>new Date(a.date)-new Date(b.date));
      dlEl.innerHTML=sorted.slice(0,4).map(d=>{
        let days=Math.max(0,Math.ceil((new Date(d.date)-new Date())/86400000));
        let cls=days<=3?"urgent":days<=14?"upcoming":"";
        return`<div class="deadlineChip ${cls}">
          <span class="dc-days" style="color:${days<=3?"var(--red)":days<=14?"var(--amber)":"var(--green)"}">${days}d</span>
          <div><div class="dc-name">${d.name}</div><div class="dc-date">📅 ${d.date}</div></div>
        </div>`;
      }).join("");
    }
  }
  // Overall Readiness card
  let rEl=document.getElementById("overallReadiness");
  if(rEl){
    let b=calcReadinessBreakdown();
    let col=b.overall>=70?"var(--green)":b.overall>=40?"var(--amber)":"var(--accent)";
    let rows=[
      {label:"Course Progress",val:b.courseR,col:"var(--accentCyan)"},
      {label:"Scholarship Reqs",val:b.scholarR,col:"var(--accent2)"},
      {label:"Study Streak",    val:b.streakR, col:"var(--amber)"},
      {label:"Today's Tasks",   val:b.taskR,   col:"var(--green)"},
    ];
    rEl.innerHTML=`<div class="readinessWrap">
      <div class="readinessBig">
        <div class="readinessBigNum" style="-webkit-text-fill-color:${col}">${b.overall}%</div>
        <div class="readinessBigLabel">${b.overall>=70?"🏆 Ready":"📈 Building"}</div>
      </div>
      <div class="readinessBreakdown">
        ${rows.map(r=>`<div class="readRow">
          <span class="readLabel">${r.label}</span>
          <div class="readBarWrap"><div class="readBar" style="width:${r.val}%;background:${r.col}"></div></div>
          <span class="readPct" style="color:${r.col}">${r.val}%</span>
        </div>`).join("")}
      </div>
    </div>`;
  }
  updateNotifCount(); showXP(); updateProfileDisplay();
}

// ── REFRESH ────────────────────────────────────────────────────
function refreshDashboard(){
  try{
    renderDashboard();
    let sEl=document.getElementById("streakCount");if(sEl)sEl.textContent=streakData.length;
  }catch(e){console.error("Dashboard:",e);}
}

// ── BOOT ───────────────────────────────────────────────────────
window.onload=async function(){
  let loading=document.getElementById("loadingScreen");
  try{
    userXP=JSON.parse(localStorage.getItem("userXP"))||0;
    applyTheme();
    if(todaysTasks.length===0&&courses.length>0)generateTodayTasks();
    refreshDashboard();showQuote();
  }catch(e){console.error("Boot:",e);}
  finally{setTimeout(()=>{if(loading)loading.style.display="none";},1200);}
};