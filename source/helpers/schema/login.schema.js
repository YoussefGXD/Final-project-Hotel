import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email can't be empty",
    "string.email": "Enter valid email",
    "any.required": "Email is required",
  }),
  password: joiPassword
    .string()
    .min(8)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required()
    .messages({
      "string.empty": "Password cannot be an empty field",
      "password.minOfLowercase":
        "Password must contain at least 1 lowercase letter",
      "password.minOfUppercase":
        "Password must contain at least 1 uppercase letter",
      "password.minOfNumeric": "Password must contain at least 1 number",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is a required field",
    }),
});
export default loginSchema;
