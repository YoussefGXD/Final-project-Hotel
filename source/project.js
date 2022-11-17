import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRouter from "./controllers/auth.controller.js";
import passport from "passport";
import jwtStrategy from "./helpers/strategies/jwtStrategy.js";
import roomRouter from "./controllers/room.controller.js";
import checkForExpiredTokens from "./helpers/functions/deleteExpTokens.js";
import errorHandler from "./helpers/middlewares/errorHandler.js";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
passport.use("jwt", jwtStrategy);

app.use(express.json());

app.use("/admin", authRouter);
app.use("/rooms", roomRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  checkForExpiredTokens.start();
});
export { prisma };
