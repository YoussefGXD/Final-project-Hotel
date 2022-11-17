import { Router } from "express";
import authenticateWithJwt from "../helpers/functions/authfuctionJwt.js";
import { JoiMiddleware } from "../helpers/middlewares/JoiMiddleware.js";
import reservARoom from "../helpers/schema/reservARoom.schema.js";
import * as roomService from "../services/Rooms/index.js";
const roomRouter = Router();

roomRouter.get("/", roomService.getRooms);
roomRouter.get("/:id", roomService.getRoomById);
roomRouter.post(
  "/reserve?a",
  JoiMiddleware(reservARoom),
  authenticateWithJwt,
  roomService.regisRoom
);
roomRouter.patch(
  "/changeStatus",
  authenticateWithJwt,
  roomService.changeRoomStatus
);
export default roomRouter;
