import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split("Bearer ")[1];

      if (!token) {
        res.status(401).json({ error: true, message: "NOT_LOGGED_IN" });
      }

      const { data } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!data) {
        res.status(401).json({ error: true, message: "NOT_LOGGED_IN" });
      }
      next();
    } else {
      res.status(401).json({ error: true, message: "NOT_LOGGED_IN" });
    }
  } catch (e) {
    console.log(e);
  }
};

export default authMiddleware;
