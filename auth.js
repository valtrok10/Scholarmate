// ============================================================
//   SCHOLARMATE AI — auth.js
//   Depends on: config.js (auth, db globals)
//
//   Firestore structure per user:
//     users/{uid} → { uid, username, displayName, email,
//                     createdAt, lastSeen, ...appData }
//
//   ► Login accepts email  OR  username
//   ► Passwords are NEVER stored in Firestore —
//     Firebase Auth handles them with bcrypt
// ============================================================

// ── SIGN UP ───────────────────────────────────────────────────
async function signup() {
  let uname = document.getElementById("signupUsername").value.trim();
  let email = document.getElementById("signupEmail").value.trim();
  let pass  = document.getElementById("signupPassword").value;

  clearAuthMsg();
  if (!uname || !email || !pass) return showAuthMsg("All fields are required.");
  if (uname.length < 3)          return showAuthMsg("Username must be at least 3 characters.");
  if (!/^[a-z0-9_]+$/i.test(uname)) return showAuthMsg("Username: letters, numbers and _ only.");
  if (pass.length < 6)           return showAuthMsg("Password must be at least 6 characters.");

  setBtnLoading(true);
  try {
    // 1 — check username availability
    let snap = await db.collection("users").where("username","==",uname.toLowerCase()).get();
    if (!snap.empty) { setBtnLoading(false); return showAuthMsg("Username already taken."); }

    // 2 — create Firebase Auth account (password stays inside Firebase Auth, hashed)
    let { user } = await auth.createUserWithEmailAndPassword(email, pass);

    // 3 — write public profile + blank app data to Firestore
    await db.collection("users").doc(user.uid).set({
      uid:         user.uid,
      username:    uname.toLowerCase(),
      displayName: uname,
      email:       email.toLowerCase(),
      createdAt:   firebase.firestore.FieldValue.serverTimestamp(),
      courses:[], todaysTasks:[], scholarships:[], deadlines:[],
      studyData:[0,0,0,0,0,0,0], streakData:[], studyHistory:[],
      userXP:0, darkMode:true
    });
    // onAuthStateChanged handles the rest
  } catch(e) {
    setBtnLoading(false);
    showAuthMsg(friendlyError(e.code));
  }
}

// ── LOGIN (email or username) ─────────────────────────────────
async function login() {
  let id   = document.getElementById("loginIdentifier").value.trim();
  let pass = document.getElementById("loginPassword").value;

  clearAuthMsg();
  if (!id || !pass) return showAuthMsg("Enter your username or email and password.");

  setBtnLoading(true);
  try {
    let emailToUse = id;

    if (!id.includes("@")) {
      // username lookup → get email from Firestore
      let snap = await db.collection("users").where("username","==",id.toLowerCase()).get();
      if (snap.empty) { setBtnLoading(false); return showAuthMsg("Username not found."); }
      emailToUse = snap.docs[0].data().email;
    }

    await auth.signInWithEmailAndPassword(emailToUse, pass);
    // onAuthStateChanged handles transition
  } catch(e) {
    setBtnLoading(false);
    showAuthMsg(friendlyError(e.code));
  }
}

// ── LOGOUT ────────────────────────────────────────────────────
function logout() {
  auth.signOut();
}

// ── RESET PASSWORD ────────────────────────────────────────────
async function resetPassword() {
  let id = document.getElementById("loginIdentifier").value.trim();
  clearAuthMsg();
  if (!id) return showAuthMsg("Enter your email or username first.");
  try {
    let emailToUse = id;
    if (!id.includes("@")) {
      let snap = await db.collection("users").where("username","==",id.toLowerCase()).get();
      if (snap.empty) return showAuthMsg("Username not found.");
      emailToUse = snap.docs[0].data().email;
    }
    await auth.sendPasswordResetEmail(emailToUse);
    showAuthMsg("✅ Reset email sent to " + emailToUse, true);
  } catch(e) { showAuthMsg(friendlyError(e.code)); }
}

// ── SAVE DATA (debounced → Firestore) ────────────────────────
let _st = null;
function saveUserData() {
  let user = auth.currentUser;
  if (!user) return;
  clearTimeout(_st);
  _st = setTimeout(() => {
    db.collection("users").doc(user.uid).set({
      courses, todaysTasks, scholarships, deadlines,
      studyData, streakData, studyHistory: studyHistory||[],
      userXP, username, darkMode,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true }).catch(console.error);
  }, 700);
}

// ── LOAD DATA ─────────────────────────────────────────────────
async function loadUserData() {
  let user = auth.currentUser;
  if (!user) return;
  try {
    let doc = await db.collection("users").doc(user.uid).get();
    if (doc.exists) {
      let d = doc.data();
      username     = d.displayName || d.username || user.email.split("@")[0];
      darkMode     = d.darkMode !== undefined ? d.darkMode : true;
      courses      = d.courses      || [];
      todaysTasks  = d.todaysTasks  || [];
      scholarships = d.scholarships || [];
      deadlines    = d.deadlines    || [];
      studyData    = d.studyData    || [0,0,0,0,0,0,0];
      streakData   = d.streakData   || [];
      studyHistory = d.studyHistory || [];
      userXP       = d.userXP       || 0;
    } else {
      username = user.email.split("@")[0];
    }
    applyTheme(); updateProfileDisplay();
    if (todaysTasks.length===0 && courses.length>0) generateTodayTasks();
    refreshDashboard(); showQuote();
    let sEl = document.getElementById("streakCount");
    if (sEl) sEl.textContent = streakData.length;
    setTimeout(checkProactiveNotifications, 2500);
  } catch(e) {
    console.error("loadUserData:", e);
    showNotif("⚠ Could not load data — check connection","warn");
  }
}

// ── AUTH STATE ────────────────────────────────────────────────
auth.onAuthStateChanged(user => {
  let ls = document.getElementById("loginScreen");
  let mw = document.getElementById("mainWebsite");
  let ld = document.getElementById("loadingScreen");
  if (ld) ld.style.display = "none";

  if (user) {
    if (ls) ls.style.display = "none";
    if (mw) mw.style.display = "block";
    loadUserData();
  } else {
    if (ls) ls.style.display = "flex";
    if (mw) mw.style.display = "none";
    // wipe in-memory state so stale data can't leak between accounts
    courses=[]; todaysTasks=[]; scholarships=[]; deadlines=[];
    studyData=[0,0,0,0,0,0,0]; streakData=[]; studyHistory=[];
    userXP=0; username="";
    localStorage.clear();
  }
});

// ── AUTH UI helpers ───────────────────────────────────────────
function showLogin()  { document.getElementById("loginForm").style.display="block"; document.getElementById("signupForm").style.display="none"; clearAuthMsg(); }
function showSignup() { document.getElementById("signupForm").style.display="block"; document.getElementById("loginForm").style.display="none"; clearAuthMsg(); }

function showAuthMsg(msg, ok=false) {
  let el = document.getElementById("authMsg");
  if (!el) return;
  el.textContent = msg;
  el.className = "authMsg " + (ok ? "ok" : "err");
  el.style.display = "block";
}
function clearAuthMsg() {
  let el = document.getElementById("authMsg");
  if (el) el.style.display = "none";
}
function setBtnLoading(on) {
  document.querySelectorAll(".loginCard button").forEach(b => {
    b.disabled = on; b.style.opacity = on ? ".55" : "1";
  });
}
function friendlyError(code) {
  return ({
    "auth/user-not-found":       "No account found.",
    "auth/wrong-password":       "Incorrect password.",
    "auth/invalid-credential":   "Wrong email or password.",
    "auth/email-already-in-use": "Email already registered.",
    "auth/invalid-email":        "Enter a valid email.",
    "auth/weak-password":        "Password too short (min 6).",
    "auth/too-many-requests":    "Too many attempts. Wait a moment.",
    "auth/network-request-failed":"Network error."
  })[code] || "Something went wrong. Try again.";
}