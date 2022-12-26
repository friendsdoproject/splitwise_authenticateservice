import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const authConfig = {
  privateKEY: fs.readFileSync("public/cert/privatekey.pem").toString(),
  publicKEY: fs.readFileSync("public/cert/publickey.pem").toString(),
  signOptions: {
    expiresIn: process.env.ACCESSTOKENEXPIRY,
    algorithm: process.env.JWTALGORITHM,
  },
  verifyOptions: {
    expiresIn: process.env.ACCESSTOKENEXPIRY,
    algorithm: process.env.JWTALGORITHM,
  },
  refreshTokenVerifyOptions: {
    expiresIn: process.env.REFRESHTOKENEXPIRY,
    algorithm: process.env.JWTALGORITHM,
  },
};
