import passport from "passport";
import { internalServerError, unAuthResponse } from "./Responsehandler.js";
export default async function authenticateWithJwt(req, res, next) {
  const authFucntionJwt = passport.authenticate(
    "jwt",
    { session: false },
    async (clientError, data, err) => {
      if (err) {
        if (err.message === "jwt expired") {
          return unAuthResponse(res, "Session expired");
        }
        if (err.message === "invalid signature") {
          return unAuthResponse(res, "Invalid signature");
        }
        return internalServerError(res, "An error has occured on the server");
      }
      if (clientError) {
        return internalServerError(res, "An error has occured on the server");
      }
      if (!data) {
        return unAuthResponse(res, "Invalid token");
      }
      req.admin = data;
      next();
    }
  );
  return authFucntionJwt(req, res, next);
}
