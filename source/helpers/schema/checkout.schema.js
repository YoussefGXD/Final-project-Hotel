import Joi from "joi";

const checkoutSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email can't be empty",
    "string.email": "Enter valid email",
    "any.required": "Email is required",
  }),
  feedback: Joi.string().min(10).max(500).required().messages({
    "string.empty": "feedback cannot be an empty field",
    "string.min": "feedback must be at least 10 characters long",
    "string.max": "feedback must be 500 characters long",
    "any.required": "feedback is a required field",
  }),
});
export default checkoutSchema;
