import { okResponse } from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";
export async function logout(req, res, next) {
  try {
    const { tokenId } = req.admin;
    await prisma.tokens.delete({
      where: {
        id: tokenId,
      },
    });
    return okResponse(res, "Logout successful");
  } catch (err) {
    next(err);
  }
}
