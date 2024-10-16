import Joi from "joi";

const profileSchema = Joi.object({
  bio: Joi.string().max(100).required(),

});

export default profileSchema;
