import { IUser } from "./user.type";

export interface IAuthResponse {
  userDetails: IUser;
  accessToken: String;
  refreshToken: String;
  errorMessage?: String;
}
