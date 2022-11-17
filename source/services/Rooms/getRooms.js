import { okResponse } from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";
export async function getRooms(req, res, next) {
  try {
    const { status } = req.query;
    const rooms = await prisma.rooms.findMany({
      where: {
        status: status,
      },
    });
    okResponse(res, "all rooms fetched successfully", rooms);
  } catch (err) {
    next(err);
  }
}
