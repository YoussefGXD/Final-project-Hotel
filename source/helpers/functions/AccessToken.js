import jwt from "jsonwebtoken";
export default function CreateToken(adminId, tokenId) {
  return jwt.sign({ adminId, tokenId }, process.env.ACCESS_TOKEN, {
    expiresIn: "4h",
  });
}
