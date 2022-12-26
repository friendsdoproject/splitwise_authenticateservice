import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

export const config: sql.config = {
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  server: process.env.SERVERNAME as string,
  database: process.env.DBNAME,
  pool: {
    max: 10,
    min: 5,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  port: parseInt(process.env.DBPORT as string),
};
