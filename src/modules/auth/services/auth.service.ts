import authRepo from "../repositories/auth.repository";
import JWTHandler from "../../../helpers/jwt_helper";
import authResponse from "../../../models/auth.model";
import { IUser } from "../../../types/user.type";
import { ErrorMessage } from "../../../validations/errorMessage";
import token from "../../../models/token.model";
import { IDecodedToken } from "../../../types/decodedToken.type";

class AuthService {
  getUser = async (userVzid: String) => {
    return await authRepo
      .checkIfUserExists(userVzid)
      .then(async (user: IUser) => {
        if (user) {
          const userRoleList = await authRepo.getRolesListFromVzId(userVzid);
          await JWTHandler.signAccessToken(user, userRoleList).then(
            (accessToken: String) => {
              authResponse.accessToken = accessToken;
            }
          );
          await JWTHandler.signRefreshToken(user).then(
            (refreshToken: String) => {
              authResponse.refreshToken = refreshToken;
            }
          );
          authResponse.userDetails = user;
          authResponse.userDetails.idUser = user.idUser;
          authResponse.userDetails.YnApproval = user.YnApproval;
          authResponse.userDetails.dtCreatedOn = user.dtCreatedOn;
          authResponse.userDetails.dtUpdatedOn = user.dtUpdatedOn;
          authResponse.userDetails.txtCreatedBy = user.txtCreatedBy;
          authResponse.userDetails.txtEmailID = user.txtEmailID;
          authResponse.userDetails.txtFirstName = user.txtFirstName;
          authResponse.userDetails.txtLastName = user.txtLastName;
          authResponse.userDetails.txtMiddleName = user.txtMiddleName;
          authResponse.userDetails.txtPhone = user.txtPhone;
          authResponse.userDetails.txtUpdatedBy = user.txtUpdatedBy;
          authResponse.userDetails.txtVzid = user.txtVzid;
          authResponse.userDetails.YnActive = user.YnActive;
        } else {
          authResponse.userDetails = user;
          authResponse.accessToken = "";
          authResponse.refreshToken = "";
          authResponse.errorMessage = ErrorMessage.USER_NOT_EXISTS;
        }
        return authResponse;
      })
      .catch((err: any) => {
        throw err;
      });
  };

  getRefreshToken = async (refreshToken: string) => {
    return await JWTHandler.verifyRefreshToken(refreshToken)
      .then(async (user: IDecodedToken) => {
        // re-assign old token details on new token payload's
        token.accessToken = await JWTHandler.signAccessToken(
          user.userObj,
          user.userRoleList
        );
        token.refreshToken = await JWTHandler.signRefreshToken(user.userObj);
        return token;
      })
      .catch((err) => {
        return err;
      });
  };

  deleteRefreshToken = async (refreshToken: string) => {
    return await JWTHandler.verifyRefreshToken(refreshToken).then(
      async (user: IDecodedToken) => {
        return await authRepo
          .deleteRefreshToken(user.userObj.idUser)
          .then((result: any) => {
            return result.Success;
          });
      }
    );
  };
}

export default new AuthService();
