import Joi from "joi";

const postSchema = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().max(1000).optional().allow(null),
  published: Joi.boolean().default(false),
});


export default postSchema;