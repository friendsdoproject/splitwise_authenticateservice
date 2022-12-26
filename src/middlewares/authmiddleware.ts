import { NextFunction, Request, Response } from "express";
import jwt_helper from "../helpers/jwt_helper";
import { ErrorMessage } from "../validations/errorMessage";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers[process.env.TOKENHEADERKEY as string]?.toString();
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ errormessage: ErrorMessage.BEARER_TOKEN_NOT_PROVIDED });

  // RSA TOKEN
  jwt_helper.verifyAccessToken(token, req, res, next);
};

export default authenticateToken;
