import Joi from "joi";
const customerSchema = Joi.object({
  id: Joi.string().min(9).required().messages({
    "string.min": "Passport can't be less than 9 characters",
    "any.required": "Passport is required",
    "string.empty": "Passport can't be empty",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Name can't be empty",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email can't be empty",
    "string.email": "Enter valid email",
    "any.required": "Email is required",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .required()
    .messages({
      "string.empty": "Phone number can't be empty",
      "any.required": "Phone number is required",
      "string.pattern": "Enter a valid phone number",
    }),
});
export default customerSchema;
