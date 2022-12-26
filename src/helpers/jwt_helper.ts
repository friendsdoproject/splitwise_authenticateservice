import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { authConfig } from "../config/authconfig";
import { IUser } from "../types/user.type";
import authRepository from "../modules/auth/repositories/auth.repository";
import { ErrorMessage } from "../validations/errorMessage";
import { IUserRole } from "../types/userRole.type";
import { IDecodedToken } from "../types/decodedToken.type";

class JWTHandler {
  signAccessToken = async (user: IUser, userRoleList: IUserRole[]) => {
    return await new Promise<String>((resolve, reject) => {
      jwt.sign(
        {
          userObj: user,
          userRoleList: userRoleList,
        },
        authConfig.privateKEY as string,
        authConfig.signOptions as SignOptions,
        (err, token) => {
          if (err) {
            reject(err);
            return err;
          }
          resolve(token as String);
        }
      );
    });
  };

  verifyAccessToken = async (
    token: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    jwt.verify(
      token as string,
      authConfig.publicKEY as string,
      authConfig.signOptions as SignOptions,
      (err, decoded: any) => {
        if (err) return res.status(403).json(err);
        req.body.decodedToken = decoded;
        next();
      }
    );
  };

  signRefreshToken = async (user: IUser) => {
    return await new Promise<String>((resolve, reject) => {
      jwt.sign(
        { userObj: user },
        authConfig.privateKEY as string,
        authConfig.refreshTokenVerifyOptions as SignOptions,
        async (err, refreshToken) => {
          if (err) {
            reject(err);
            return err;
          }
          // Store Token in DB
          await authRepository.saveRefreshToken(
            user.idUser,
            refreshToken as string
          );
          resolve(refreshToken as string);
        }
      );
    });
  };

  verifyRefreshToken = async (refreshToken: String) => {
    return await new Promise<IDecodedToken>((resolve, reject) => {
      jwt.verify(
        refreshToken as string,
        authConfig.publicKEY as string,
        async (err, payload: any) => {
          if (err) return reject(err);
          const user = payload as IDecodedToken;
          await authRepository
            .getRefreshToken(user.userObj.idUser)
            .then((refreshTokenFromDB: any) => {
              if (refreshTokenFromDB.RefreshToken == refreshToken)
                return resolve(user);
              else return reject(ErrorMessage.TOKEN_NOT_MATCHED);
            })
            .catch((err) => {
              throw err;
            });
        }
      );
    });
  };
}

export default new JWTHandler();
