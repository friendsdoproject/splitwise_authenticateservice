import sql, { MAX } from "mssql";
import { storedProcs } from "../../../constants/dbconstants";
import { ConnectionPoolInstance } from "../../../helpers/db_helper";
import { IUser } from "../../../types/user.type";

class AuthRepo {
  checkIfUserExists = async (userVzid: String): Promise<IUser> => {
    return (await ConnectionPoolInstance.getInstance())
      .request()
      .input(
        storedProcs.usp_GetUserDetailsFromVzId.sp_params.pi_txtVZID,
        sql.VarChar(30),
        userVzid
      )
      .execute(storedProcs.usp_GetUserDetailsFromVzId.sp_name)
      .then((spresult: sql.IProcedureResult<IUser>) => {
        return spresult.recordset[0];
      })
      .catch((err: any) => {
        throw err;
      });
  };

  getRolesListFromVzId = async (userVzid: String): Promise<any> => {
    return (await ConnectionPoolInstance.getInstance())
      .request()
      .input(
        storedProcs.usp_GetRolesListFromVzId.sp_params.pi_txtVZID,
        sql.VarChar(30),
        userVzid
      )
      .execute(storedProcs.usp_GetRolesListFromVzId.sp_name)
      .then((spresult: sql.IProcedureResult<any>) => {
        return spresult.recordset;
      })
      .catch((err: any) => {
        throw err;
      });
  };

  saveRefreshToken = async (
    userId: Number,
    refreshToken: string
  ): Promise<string> => {
    return (await ConnectionPoolInstance.getInstance())
      .request()
      .input(
        storedProcs.usp_InsertOrUpdateRefreshToken.sp_params.pi_RefreshToken,
        sql.VarChar(MAX),
        refreshToken
      )
      .input(
        storedProcs.usp_InsertOrUpdateRefreshToken.sp_params.pi_IdUser,
        sql.Int,
        userId
      )
      .execute(storedProcs.usp_InsertOrUpdateRefreshToken.sp_name)
      .then((spresult: sql.IProcedureResult<any>) => {
        return spresult.recordset[0].Success;
      })
      .catch((err: any) => {
        throw err;
      });
  };

  getRefreshToken = async (userId: Number): Promise<String> => {
    return (await ConnectionPoolInstance.getInstance())
      .request()
      .input(
        storedProcs.usp_GetRefreshToken.sp_params.pi_IdUser,
        sql.Int,
        userId
      )
      .execute(storedProcs.usp_GetRefreshToken.sp_name)
      .then((spresult: sql.IProcedureResult<String>) => {
        return spresult.recordset[0];
      })
      .catch((err: any) => {
        throw err;
      });
  };

  deleteRefreshToken = async (userId: Number): Promise<String> => {
    return (await ConnectionPoolInstance.getInstance())
      .request()
      .input(
        storedProcs.usp_DeleteRefreshToken.sp_params.pi_IdUser,
        sql.Int,
        userId
      )
      .execute(storedProcs.usp_DeleteRefreshToken.sp_name)
      .then((spresult: sql.IProcedureResult<String>) => {
        return spresult.recordset[0];
      })
      .catch((err: any) => {
        throw err;
      });
  };
}

export default new AuthRepo();
