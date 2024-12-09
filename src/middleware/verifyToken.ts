import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
  //Get jwtToken FROM THE cookies
  const token = req.cookies.jwtToken;

  if (!token) {
       // res.status(401).json({ message: "Unauthorized" });
     //return
      // Proceed without authentication for unauthenticated users
      return next();
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload ;
    //Get userId from the decode token
    req.userId = (decode as JwtPayload).userId; //assigning it to the req.userId
    next();
  } catch (err) {
     res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
