import { okResponse } from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";
export async function changeRoomStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const room = await prisma.rooms.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
      },
    });
    okResponse(res, "Room status updated successfully", room);
  } catch (err) {
    next(err);
  }
}
