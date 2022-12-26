import sql from "mssql";
import { config } from "../config/dbconfig";

/*
To Create Singleton Connection Pool Instance
*/
export class ConnectionPoolInstance {
  private static instance: Promise<sql.ConnectionPool>;

  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new sql.ConnectionPool(config).connect();
    }
    return this.instance;
  }
}
