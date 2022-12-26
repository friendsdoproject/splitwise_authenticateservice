import { Request, Response } from "express";
import { ErrorMessage } from "../../../validations/errorMessage";
import { IAuthResponse } from "../../../types/authResponse.type";
import { IToken } from "../../../types/token.type";
import { IUser } from "../../../types/user.type";
import authService from "../services/auth.service";
import { IDecodedToken } from "../../../types/decodedToken.type";

class AuthController {
  login = async (req: Request<{}, {}, IUser>, res: Response): Promise<void> => {
    const userVzid = req.body.txtVzid;
    if (!userVzid) res.status(401).json({ errorMessage: res.sendStatus(401) });
    await authService
      .getUser(userVzid)
      .then((data: IAuthResponse) => {
        if (data.errorMessage === ErrorMessage.USER_NOT_EXISTS)
          res.status(401).json(data);
        else res.status(200).json(data);
      })
      .catch((error: any) => {
        throw res.status(500).json(error?.message);
      });
  };

  refreshToken = async (req: Request, res: Response): Promise<any> => {
    const authHeader =
      req.headers[process.env.TOKENHEADERKEY as string]?.toString();
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (!refreshToken)
      return res.status(401).json({
        errorMessage: ErrorMessage.HEADER_DOESNT_CONTAIN_REFRESH_TOKEN,
      });

    await authService
      .getRefreshToken(refreshToken)
      .then((data: IToken) => {
        res.status(201).json(data);
      })
      .catch((error: any) => {
        throw res.status(500).json(error?.message);
      });
  };

  logout = async (req: Request, res: Response): Promise<any> => {
    const authHeader =
      req.headers[process.env.TOKENHEADERKEY as string]?.toString();
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (!refreshToken)
      return res.status(401).json({ errorMessage: res.sendStatus(401) });

    await authService
      .deleteRefreshToken(refreshToken)
      .then((data: String) => {
        res.status(204).json(data);
      })
      .catch((error: any) => {
        throw res.status(500).json(error?.message);
      });
  };

  getMe = async (req: Request, res: Response): Promise<void> => {
    const user = req.body.decodedToken as IDecodedToken;
    res.status(200).json(user.userObj);
  };
}

export default new AuthController();
