import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a type of text",
    "string.empty": "Username cannot be an empty field",
    "string.min": "Username should have a minimum length of {#limit}",
    "string.max": "Username should have a maximum length of {#limit}",
    "any.required": "Username is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email cannot be an empty field",
    "string.email": "Email must be a valid email",
    "any.required": "Email is a required field",
  }),
  role: Joi.string().valid("customer", "admin", "seller").messages({
    "string.base": "Role should be a type of text",
    "string.empty": "Role cannot be an empty field",
    "any.required": "Role is a required field",
    "any.only": 'Role must be either "USER" or "ADMIN" or "SELLER"',
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password cannot be an empty field",
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is a required field",
  }),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Password confirmation is required",
  }),
});

export default userSchema;
