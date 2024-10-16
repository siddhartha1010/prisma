import Joi from "joi";

const commentSchema = Joi.object({
  content: Joi.string().required(),
});

export default commentSchema;
