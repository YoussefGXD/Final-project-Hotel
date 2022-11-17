import { badRequest } from "../functions/Responsehandler.js";

export function JoiMiddleware(schema) {
  return async (req, res, next) => {
    try {
      if (!schema) {
        throw new Error("Schema is requierd");
      }
      const value = await schema.validateAsync(req.body, {
        abortEarly: true,
        convert: true,
        allowUnknown: false,
      });
      req.body = value;
      next();
    } catch (err) {
      if (err.details) {
        const error = err.details.map((e) => e.message).join(",");
        return badRequest(res, error);
      }
      next(err);
    }
  };
}
