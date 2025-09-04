const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(401).json({ message: "Token expired" });
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { auth };
