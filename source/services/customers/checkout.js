import { okResponse } from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";

export async function checkout(req, res, next) {
  try {
    const { email, feedback } = req.body;
    const { id } = req.admin;
    const customer = await prisma.customers.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        reservedRooms: {
          select: {
            startAt: true,
            room: {
              select: {
                id: true,
                dayCost: true,
              },
            },
          },
        },
      },
    });
    await prisma.reservedRooms.delete({
      where: {
        userId: customer.id,
      },
    });
    await prisma.checkedOutRooms.create({
      data: {
        adminId: id,
        cost:
          customer.reservedRooms[0].room.dayCost *
          (new Date(Date.now()) - customer.reservedRooms.startAt),
        feedback,
        userId: customer.id,
        roomId: customer.reservedRooms[0].room.id,
        startAt: customer.reservedRooms[0].startAt,
        endAt: new Date(Date.now()),
      },
    });
    await prisma.rooms.update({
      where: {
        id: customer.reservedRooms[0].room.id,
      },
      data: {
        status: "disabled",
      },
    });
    okResponse(res, "Customer checked out successfully");
  } catch (err) {
    next(err);
  }
}
