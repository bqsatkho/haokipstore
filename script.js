import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJ-gIHFfggLiD5uhu_R2P0j62mql4QLX4",
    authDomain: "haokipstore-f8f29.firebaseapp.com",
    projectId: "haokipstore-f8f29",
    storageBucket: "haokipstore-f8f29.firebasestorage.app",
    messagingSenderId: "750265648375",
    appId: "1:750265648375:web:4e8409982aaabc5bf6bff2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase engine is connected and running!");