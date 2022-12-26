import { IUser } from "./user.type";
import { IUserRole } from "./userRole.type";

export interface IDecodedToken {
  userObj: IUser;
  userRoleList: IUserRole[];
}
