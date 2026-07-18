import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// 1. Get the boxes and buttons from your HTML
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

// 2. Make the Register Button Work
registerBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account Created Successfully! Welcome to Haokip Store!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// 3. Make the Log In Button Work
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Logged In Successfully! Time to Recharge!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});