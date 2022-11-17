import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { prisma } from "../../project.js";
dotenv.config();
const jwtStrategy = new Strategy(
  {
    secretOrKey: process.env.ACCESS_TOKEN,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    try {
      const token = await prisma.tokens.findUnique({
        where: {
          id: payload.tokenId,
        },
        include: {
          admin: true,
        },
      });
      if (token) {
        return done(null, { ...token.admin, tokenId: token.id });
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
);

export default jwtStrategy;
