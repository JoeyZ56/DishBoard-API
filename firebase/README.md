Firebase Admin Auth Middleware

This document explains the two core pieces involved in handling Firebase Admin SDK authentication in your backend.

⸻

## firebaseAuth.js

1. Firebase Initialization

File section initializing Firebase Admin SDK for server-side authentication.

Logic:
• Uses dotenv to access environment variables.
• Reads and parses the FIREBASE_ADMIN_SDK service account JSON from the .env file.
• Initializes Firebase Admin using initializeApp and cert().
• Exports the adminAuth object for use in other modules.

Usage:

Call adminAuth where you need server-side access to Firebase authentication features, such as fetching users or handling tokens.

⸻

## firebaseConfig.js

2. verifyToken Middleware

Middleware to verify incoming Firebase ID tokens.

Purpose:

Secure protected routes by ensuring that requests include a valid Firebase ID token.

Logic:
• Checks for the Authorization header (expects format: Bearer <token>).
• If no token is found, responds with 401 Unauthorized.
• Uses admin.auth().verifyIdToken(token) to verify the token.
• If valid, attaches the decoded token (user info) to req.user.
• If invalid, logs the error and responds with 401 Unauthorized.

Usage:

Used as middleware in protected routes:

const verifyToken = require("./path/to/verifyToken");

app.get("/secure-route", verifyToken, (req, res) => {
res.send(`Welcome ${req.user.email}`);
});

⸻

Notes
• verifyToken ensures that only authenticated users with a valid Firebase ID token can access protected routes.
• The Firebase Admin SDK is designed to be used server-side and should be kept secure.

⸻

Exports
• verifyToken (middleware for token validation)
• adminAuth (Firebase Admin auth reference for other backend uses)

This setup supports Firebase Authentication in a secure, scalable way by delegating authentication validation to the Firebase Admin SDK.
