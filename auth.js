// ============================================================
//   SCHOLARMATE — AUTH.JS
//   Firebase Auth + Firestore user profiles
//
//   Structure:
//     users/{uid} → { username, email, uid, createdAt, ...appData }
//
//   Login accepts:  email OR username
//   Password:       handled by Firebase Auth only (never stored in Firestore)
// ============================================================
const firebaseConfig={

apiKey:window.CONFIG.FIREBASE_API_KEY,

authDomain:
window.CONFIG.FIREBASE_AUTH_DOMAIN,

projectId:
window.CONFIG.FIREBASE_PROJECT_ID,

storageBucket:
window.CONFIG.FIREBASE_STORAGE_BUCKET,

messagingSenderId:
window.CONFIG.FIREBASE_MESSAGING_SENDER_ID,

appId:
window.CONFIG.FIREBASE_APP_ID

};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// ── SIGN UP ───────────────────────────────────────────────────
async function signup() {
  let usernameVal = document.getElementById("signupUsername").value.trim();
  let emailVal    = document.getElementById("signupEmail").value.trim();
  let passwordVal = document.getElementById("signupPassword").value;

  // validation
  if (!usernameVal || !emailVal || !passwordVal) {
    showAuthError("All fields are required.");
    return;
  }
  if (usernameVal.length < 3) {
    showAuthError("Username must be at least 3 characters.");
    return;
  }
  if (passwordVal.length < 6) {
    showAuthError("Password must be at least 6 characters.");
    return;
  }

  setAuthLoading(true);

  try {
    // 1 — check username is not already taken
    let usernameCheck = await db.collection("users")
      .where("username", "==", usernameVal.toLowerCase())
      .get();

    if (!usernameCheck.empty) {
      showAuthError("Username already taken. Choose another.");
      setAuthLoading(false);
      return;
    }

    // 2 — create Firebase Auth account (password stored securely by Firebase, never in Firestore)
    let userCredential = await auth.createUserWithEmailAndPassword(emailVal, passwordVal);
    let user = userCredential.user;

    // 3 — save user profile to Firestore (NO password stored here)
    await db.collection("users").doc(user.uid).set({
      uid:         user.uid,
      username:    usernameVal.toLowerCase(),
      displayName: usernameVal,        // original casing for display
      email:       emailVal.toLowerCase(),
      createdAt:   firebase.firestore.FieldValue.serverTimestamp(),
      // app data defaults
      courses:      [],
      todaysTasks:  [],
      scholarships: [],
      deadlines:    [],
      studyData:    [0,0,0,0,0,0,0],
      streakData:   [],
      studyHistory: [],
      userXP:       0,
      darkMode:     true
    });

    showNotif("✅ Account created! Welcome, " + usernameVal);

  } catch (error) {
    let msg = friendlyAuthError(error.code);
    showAuthError(msg);
    setAuthLoading(false);
  }
}

// ── LOGIN (email OR username) ─────────────────────────────────
async function login() {
  let identifier  = document.getElementById("loginIdentifier").value.trim();
  let passwordVal = document.getElementById("loginPassword").value;

  if (!identifier || !passwordVal) {
    showAuthError("Enter your username or email and password.");
    return;
  }

  setAuthLoading(true);

  try {
    let emailToUse = identifier;

    // If it doesn't look like an email, treat it as a username
    // → look up the email from Firestore
    if (!identifier.includes("@")) {
      let snap = await db.collection("users")
        .where("username", "==", identifier.toLowerCase())
        .get();

      if (snap.empty) {
        showAuthError("Username not found. Check your username or use your email.");
        setAuthLoading(false);
        return;
      }

      emailToUse = snap.docs[0].data().email;
    }

    // sign in through Firebase Auth (which checks the password securely)
    await auth.signInWithEmailAndPassword(emailToUse, passwordVal);
    // onAuthStateChanged handles the rest

  } catch (error) {
    let msg = friendlyAuthError(error.code);
    showAuthError(msg);
    setAuthLoading(false);
  }
}

// ── LOGOUT ────────────────────────────────────────────────────
function logout() {
  auth.signOut().catch(e => console.error(e));
}

// ── RESET PASSWORD ────────────────────────────────────────────
async function resetPassword() {
  let identifier = document.getElementById("loginIdentifier").value.trim();

  if (!identifier) {
    showAuthError("Enter your email or username first.");
    return;
  }

  let emailToUse = identifier;

  try {
    if (!identifier.includes("@")) {
      let snap = await db.collection("users")
        .where("username", "==", identifier.toLowerCase())
        .get();
      if (snap.empty) { showAuthError("Username not found."); return; }
      emailToUse = snap.docs[0].data().email;
    }

    await auth.sendPasswordResetEmail(emailToUse);
    showAuthError("✅ Password reset email sent to " + emailToUse, "success");

  } catch (error) {
    showAuthError(friendlyAuthError(error.code));
  }
}

// ── SAVE USER DATA (debounced) ────────────────────────────────
let _saveTimeout = null;

function saveUserData() {
  let user = auth.currentUser;
  if (!user) return;

  clearTimeout(_saveTimeout);

  _saveTimeout = setTimeout(async () => {
    try {
      await db.collection("users").doc(user.uid).update({
        courses,
        todaysTasks,
        scholarships,
        deadlines,
        studyData,
        streakData,
        studyHistory: studyHistory || [],
        userXP,
        username,
        darkMode,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      // doc might not exist yet on very first save — use set with merge
      db.collection("users").doc(user.uid).set({
        courses, todaysTasks, scholarships, deadlines,
        studyData, streakData, studyHistory: studyHistory || [],
        userXP, username, darkMode
      }, { merge: true });
    }
  }, 700);
}

// ── LOAD USER DATA ────────────────────────────────────────────
async function loadUserData() {
  let user = auth.currentUser;
  if (!user) return;

  try {
    let doc = await db.collection("users").doc(user.uid).get();

    if (doc.exists) {
      let d = doc.data();

      // load profile
      username  = d.displayName || d.username || user.email.split("@")[0];
      darkMode  = d.darkMode !== undefined ? d.darkMode : true;

      // load app data
      courses      = d.courses      || [];
      todaysTasks  = d.todaysTasks  || [];
      scholarships = d.scholarships || [];
      deadlines    = d.deadlines    || [];
      studyData    = d.studyData    || [0,0,0,0,0,0,0];
      streakData   = d.streakData   || [];
      studyHistory = d.studyHistory || [];
      userXP       = d.userXP       || 0;

    } else {
      // brand new user — profile was created by signup, but just in case
      username = user.email.split("@")[0];
      darkMode = true;
    }

    applyTheme();
    updateProfileDisplay();
    refreshDashboard();
    showQuote();

    // sync streak pill
    let streakEl = document.getElementById("streakCount");
    if (streakEl) streakEl.textContent = streakData.length;

    // proactive notifications after a short delay
    setTimeout(() => checkProactiveNotifications(), 2500);

  } catch (error) {
    console.error("loadUserData failed:", error);
    showNotif("⚠ Could not load your data. Check connection.", "warn");
  }
}

// ── AUTH STATE LISTENER ───────────────────────────────────────
auth.onAuthStateChanged(user => {
  let loginScreen  = document.getElementById("loginScreen");
  let mainWebsite  = document.getElementById("mainWebsite");
  let loadingScreen = document.getElementById("loadingScreen");

  if (user) {
    // hide login, show app
    if (loginScreen)  loginScreen.style.display  = "none";
    if (mainWebsite)  mainWebsite.style.display   = "block";
    if (loadingScreen) loadingScreen.style.display = "none";

    loadUserData();

  } else {
    // show login, hide app
    if (loginScreen)  loginScreen.style.display  = "flex";
    if (mainWebsite)  mainWebsite.style.display  = "none";
    if (loadingScreen) loadingScreen.style.display = "none";

    // clear all state so previous account's data can't leak
    courses = []; todaysTasks = []; scholarships = []; deadlines = [];
    studyData = [0,0,0,0,0,0,0]; streakData = []; studyHistory = [];
    userXP = 0; username = "";
    localStorage.clear();
  }
});

// ── LOGIN UI HELPERS ──────────────────────────────────────────
function showLoginForm()   {
  document.getElementById("loginForm").style.display   = "block";
  document.getElementById("signupForm").style.display  = "none";
  clearAuthError();
}
function showSignupForm()  {
  document.getElementById("loginForm").style.display   = "none";
  document.getElementById("signupForm").style.display  = "block";
  clearAuthError();
}

function showAuthError(msg, type="error") {
  let el = document.getElementById("authError");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  el.style.background = type === "success"
    ? "rgba(16,185,129,.15)"
    : "rgba(239,68,68,.15)";
  el.style.borderColor = type === "success"
    ? "rgba(16,185,129,.3)"
    : "rgba(239,68,68,.3)";
  el.style.color = type === "success" ? "#6ee7b7" : "#fca5a5";
}
function clearAuthError() {
  let el = document.getElementById("authError");
  if (el) el.style.display = "none";
}

function setAuthLoading(on) {
  let btns = document.querySelectorAll(".loginCard button");
  btns.forEach(b => {
    b.disabled = on;
    b.style.opacity = on ? ".5" : "1";
  });
}

function friendlyAuthError(code) {
  const map = {
    "auth/user-not-found":        "No account found with that email.",
    "auth/wrong-password":        "Incorrect password. Try again.",
    "auth/email-already-in-use":  "An account with this email already exists.",
    "auth/invalid-email":         "Please enter a valid email address.",
    "auth/weak-password":         "Password must be at least 6 characters.",
    "auth/too-many-requests":     "Too many attempts. Try again in a few minutes.",
    "auth/network-request-failed":"Network error. Check your connection.",
    "auth/invalid-credential":    "Incorrect email or password.",
  };
  return map[code] || "Something went wrong. Please try again.";
}