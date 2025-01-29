// lib/firebaseConfig.js
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
});

// Initialize Admin Auth
const adminAuth = getAuth();

// Export Admin Auth
module.exports = { adminAuth };
