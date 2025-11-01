import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log(`The decoded user is :`, req.user);

      return next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token has expired. Please log in again.",
        });
      }
      res.status(400).json({
        message: "Token is not valid",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied. Admin privileges required." });
};
export default verifyToken;
export { verifyAdmin };
