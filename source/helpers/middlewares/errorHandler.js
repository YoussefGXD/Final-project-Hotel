import { internalServerError } from "../functions/Responsehandler.js";

export default function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err);
    return internalServerError(
      res,
      "Internal Server Error: Please consult the backend team"
    );
  }
  next();
}
