import { NextFunction, Request, Response } from "express";
import { IDecodedToken } from "../types/decodedToken.type";
import { IUserRole } from "../types/userRole.type";
import AppError from "../utils/app-error";

export const restrictTo =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.body.decodedToken as IDecodedToken;
    const userRoles = decodedToken.userRoleList as IUserRole[];
    const roleAllowed = userRoles.filter(
      (userRole: IUserRole) => !allowedRoles.includes(userRole.roleName)
    );
    if (roleAllowed.length === 0) {
      return next(
        new AppError("You are not allowed to perform this action", 403)
      );
    }
    next();
  };
