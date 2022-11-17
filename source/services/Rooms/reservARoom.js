import {
  conflict,
  okResponse,
} from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";

export async function regisRoom(req, res, next) {
  try {
    const { email, roomId, endAt } = req.body;
    const { id } = req.admin;
    const customer = await prisma.customers.findUnique({
      where: {
        email: email,
      },
    });
    const room = await prisma.rooms.findUnique({
      where: {
        id: roomId,
      },
    });
    if (room.status === "reserved") {
      return conflict(res, "This room already reserved ");
    }
    if (room.status === "disabled") {
      return conflict(res, "This room is disabled");
    }
    const reserveRoom = await prisma.reservedRooms.create({
      data: {
        userId: customer.id,
        roomId: parseInt(roomId),
        adminId: id,
        startAt: new Date(Date.now()),
        endAt: new Date(endAt),
      },
    });
    okResponse(res, "Room reserved successfully", reserveRoom);
  } catch (err) {
    next(err);
  }
}
