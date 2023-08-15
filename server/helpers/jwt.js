const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// create token
function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

// authentication
const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, verifyToken };
