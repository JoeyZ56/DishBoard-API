const { adminAuth } = require("../firebase/firebaseConfig");

const verifyToken = async (req, res, next) => {
  // Accesses the Authorization header from the incoming HTTP request.
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided!" });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken; // Attach user info to request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Failed to process token:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token!" });
  }
};

module.exports = verifyToken;
