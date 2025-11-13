const jwt = require("jsonwebtoken");
const SECRET = "MONU_BANNA_TEST_SECRET";

module.exports = (req, res, next) => {
  const token = req.query.token;

  if (!token)
    return res.status(401).json({ message: "Token required" });

  try {
    const payload = jwt.verify(token, SECRET);
    req.tokenPayload = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
