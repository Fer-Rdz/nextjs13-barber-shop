import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ erro: "Denied Access" });
  try {
    const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "invalid Token" });
  }
};

export default verifyToken;
