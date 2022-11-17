import { okResponse } from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";
export async function getRoomById(req, res, next) {
  try {
    const { id } = req.params;
    const room = await prisma.rooms.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    okResponse(res, "Room fetched successfully", room);
  } catch (err) {
    next(err);
  }
}
