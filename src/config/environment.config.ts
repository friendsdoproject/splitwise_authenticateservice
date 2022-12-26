declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: String;
      CLIENTURI: string;
      DBUSER: string;
      DBPASSWORD: string;
      SERVERNAME: string;
      DBNAME: string;
      DBPORT: string;
      ACCESSTOKENEXPIRY: string;
      REFRESHTOKENEXPIRY: string;
      JWTALGORITHM: string;
      TOKENHEADERKEY: string;
    }
  }
}

export {};
