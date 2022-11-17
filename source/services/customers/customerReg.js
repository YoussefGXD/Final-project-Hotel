import {
  conflict,
  createResponse,
} from "../../helpers/functions/Responsehandler.js";
import { prisma } from "../../project.js";
export async function customerReg(req, res, next) {
  try {
    const { id, name, phoneNumber, email } = req.body;
    const checkemail = await prisma.customers.findUnique({
      where: {
        email,
      },
    });
    const checkphone = await prisma.customers.findUnique({
      where: {
        phoneNumber,
      },
    });
    const idCheck = await prisma.customers.findUnique({
      where: {
        id,
      },
    });
    if (checkemail || checkphone || idCheck) {
      return conflict(res, "This customer aleady exixts", checkemail);
    }
    const customer = await prisma.customers.create({
      data: {
        id,
        name,
        phoneNumber,
        email,
      },
    });
    createResponse(res, "customer created successfully", customer);
  } catch (err) {
    next(err);
  }
}
