import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import authRouter from "./routes/auth.route";
import cors from "cors";
import compression from "compression";

//to load env file
dotenv.config();

//to load the seggrated swagger file in public folder
const swaggerJSDoc = YAML.load("public/docs/swagger.yaml");

//to create an express application
const app = express();

//to reduce the bundle file
app.use(compression());

// to expect the request and response in json format, helps to parse responses and requests in json
app.use(express.json());

// to need check
app.use(express.urlencoded({ extended: true }));

//node concept, to load assert
app.use(express.static("public"));

//to allow the request from provided origin
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENTURI,
  })
);

// swagger setup to load the swagger package
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc));

//auth endpoint
app.use("/api/auth", authRouter);

// Testing
app.get("/healthChecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Splitwise",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Splitwise auth service is running !!");
});
