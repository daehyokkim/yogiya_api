import { verifyAccessToken } from "../utiles/jwt";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split("Bearer ")[1];

      if (!token) {
        res.status(401).json({ error: true, message: "NOT_LOGGED_IN" });
      }

      const data = verifyAccessToken(token);
      if (!data) {
        res.status(401).json({ error: true, message: "NOT_LOGGED_IN" });
      }
      req.decodedUser = data;
      next();
    } else {
      res.status(401).json({ error: true, message: "NOT_LOGGED_IN" });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

export default authMiddleware;
