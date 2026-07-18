import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
console.log("Dual Authentication Engine running!");

// --- EMAIL & PASSWORD SYSTEM ---
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user).then(() => {
        alert("Account Created! Please check your email inbox for a verification link before logging in.");
      });
    })
    .catch((error) => { alert("Error: " + error.message); });
});

loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user.emailVerified) {
        alert("Logged In Successfully! Welcome back.");
      } else {
        alert("Please verify your email address first! Check your inbox.");
      }
    })
    .catch((error) => { alert("Error: " + error.message); });
});

// --- PHONE & OTP SYSTEM ---
const phoneInput = document.getElementById("phone-input");
const sendOtpBtn = document.getElementById("send-otp-btn");
const otpSection = document.getElementById("otp-section");
const otpInput = document.getElementById("otp-input");
const verifyOtpBtn = document.getElementById("verify-otp-btn");

// Setup Invisible reCAPTCHA 
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    // reCAPTCHA solved
  }
});

// 1. Send the Text Message
sendOtpBtn.addEventListener("click", () => {
  const phoneNumber = phoneInput.value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult; 
      otpSection.style.display = "block"; 
      alert("OTP Text Message Sent! Check your phone.");
    })
    .catch((error) => { alert("Error: " + error.message); });
});

// 2. Verify the 6-Digit Code
verifyOtpBtn.addEventListener("click", () => {
  const code = otpInput.value;
  
  window.confirmationResult.confirm(code)
    .then((result) => {
      alert("Phone Verified! Logged in successfully!");
    })
    .catch((error) => { alert("Invalid OTP code. Please try again."); });
});