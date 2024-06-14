// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZaHsCaDQJryc_wTRf7uCCtUaF1bU3rwc",
  authDomain: "tlqkf-59331.firebaseapp.com",
  projectId: "tlqkf-59331",
  storageBucket: "tlqkf-59331.appspot.com",
  messagingSenderId: "21635499627",
  appId: "1:21635499627:web:764ab6955c65c863d6532e",
  measurementId: "G-2YTD2EB9B1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
