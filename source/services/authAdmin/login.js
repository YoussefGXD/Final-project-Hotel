import bcyrpt from "bcrypt";
import CreateToken from "../../helpers/functions/AccessToken.js";
import {
  badRequest,
  okResponse,
} from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (!admin) {
      return badRequest(res, "Invalid email");
    }
    const checkPass = await bcyrpt.compare(password, admin.password);
    if (!checkPass) {
      return badRequest(res, "Invalid password");
    }
    const newToken = await prisma.tokens.create({
      data: {
        adminId: admin.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4),
      },
    });
    const token = CreateToken(admin.id, newToken.id);
    delete admin.password;
    return okResponse(res, "Logged in successfully", { ...admin, token });
  } catch (err) {
    next(err);
  }
}
