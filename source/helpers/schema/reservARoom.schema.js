import Joi from "joi";

const reservARoom = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email can't be empty",
    "string.email": "Enter valid email",
    "any.required": "Email is required",
  }),
  roomId: Joi.number().min(1).required().messages({
    "number.base": "roomId must be a number",
    "number.min": "roomId can't be less than 1",
    "any.required": "roomId is a required field",
  }),
  endAt: Joi.date().greater("now").iso().messages({
    "date.base": "endAt must be a date",
    "date.greater": "endAt must be greater than now",
    "date.format": "endAt must be ISO format",
  }),
});
export default reservARoom;
