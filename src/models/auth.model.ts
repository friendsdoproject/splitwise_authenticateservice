import { User } from "./user.model";

export class AuthResponse {
  userDetails!: User;
  accessToken!: String;
  refreshToken!: String;
  errorMessage?: String;
}

export default new AuthResponse();
