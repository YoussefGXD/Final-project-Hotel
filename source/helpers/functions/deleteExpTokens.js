import { CronJob } from "cron";
import { prisma } from "../../project.js";

const checkForExpiredTokens = new CronJob(" * */4 * * *", async () => {
  console.log("Checking for expired tokens...");
  const expiredTokens = await prisma.tokens.findMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
  if (expiredTokens.length > 0) {
    console.log(`Found ${expiredTokens.length} expired tokens`);
    for (const token of expiredTokens) {
      await prisma.tokens.delete({
        where: {
          id: token.id,
        },
      });
    }
    console.log("Deleted expired tokens");
  } else {
    console.log("No expired tokens found");
  }
});
export default checkForExpiredTokens;
