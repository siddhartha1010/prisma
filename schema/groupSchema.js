import Joi from "joi";

const groupSchema = Joi.object({
  gname: Joi.string().required(),
});

export default groupSchema;
