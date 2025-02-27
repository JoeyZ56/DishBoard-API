const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);


initializeApp({
  credential: cert(serviceAccount),
});

const adminAuth = getAuth();

module.exports = { adminAuth };
