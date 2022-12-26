// import AuthService from "../../../src/modules/auth/services/auth.service";
// import { IAuthResponse } from "../../../src/types/authResponse.type";
// import { Response } from "supertest";
// import express from "express";
// import authRouter from "../../../src/routes/auth.route";
// import supertest from "supertest";

// const app = express();
// app.use(express.json());
// app.use("/api/auth", authRouter);
// const data = {
//   txtVzid: "sja1kuj",
// };

// describe("Authentication Test Suite", () => {
//   beforeEach(() => {});

//   test("responds to /api/auth/login", async () => {
//     await supertest(app)
//       .post("/api/auth/login")
//       .send(data)
//       .set("Accept", "application/json")
//       .expect(200)
//       .then((res: Response) => {
//         expect(res.header["content-type"]).toBe(
//           "application/json; charset=utf-8"
//         );
//         expect(res.statusCode).toBe(200);
//       });
//   }, 10000);

//   test("Is User Present in DB", async () => {
//     await AuthService.getUser("sja1kuj").then((result: IAuthResponse) => {
//       expect(result.userDetails).toHaveProperty("txtVzid", "sja1kuj");
//     });
//   }, 10000);
// });
