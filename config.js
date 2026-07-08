// ============================================================
//   SCHOLARMATE AI — config.js
//   Firebase initialisation — imported first in index.html
// ============================================================
const firebaseConfig = {
  apiKey:            "AIzaSyCs7_XGz3r-4VqbRUfTkVYDD1fId4BAL5c",
  authDomain:        "scholarmate-bce64.firebaseapp.com",
  projectId:         "scholarmate-bce64",
  storageBucket:     "scholarmate-bce64.firebasestorage.app",
  messagingSenderId: "638444780528",
  appId:             "1:638444780528:web:12055062fac955c6653b35"
};

// Guard against duplicate initialisation (hot-reload safe)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db   = firebase.firestore();