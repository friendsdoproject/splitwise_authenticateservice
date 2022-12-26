export const storedProcs = {
  usp_GetUserDetailsFromVzId: {
    sp_name: "dbo.usp_GetUserDetailsFromVzId",
    sp_params: {
      pi_txtVZID: "pi_txtVZID",
    },
  },
  usp_GetRolesListFromVzId: {
    sp_name: "dbo.usp_GetRolesListFromVzId",
    sp_params: {
      pi_txtVZID: "pi_txtVZID",
    },
  },
  usp_InsertOrUpdateRefreshToken: {
    sp_name: "dbo.usp_InsertOrUpdateRefreshToken",
    sp_params: {
      pi_RefreshToken: "pi_RefreshToken",
      pi_IdUser: "pi_IdUser",
    },
  },
  usp_GetRefreshToken: {
    sp_name: "dbo.usp_GetRefreshToken",
    sp_params: {
      pi_IdUser: "pi_IdUser",
    },
  },
  usp_DeleteRefreshToken: {
    sp_name: "dbo.usp_DeleteRefreshToken",
    sp_params: {
      pi_IdUser: "pi_IdUser",
    },
  },
};

// Table Type
export const tableType = {
  react_UserVzidType: {
    tvp_name: "dbo.react_UserVzidType",
    tvp_column: {
      id: "id",
      userVzid: "userVzid",
      userName: "userName",
    },
  },
};
