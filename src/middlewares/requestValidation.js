const joi = require('joi');

const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const productSchema = joi.object({
  name: joi.string()
    .alphanum()
    .min(5)
    .required(),
});

const validateProduct = ({ body }, res, next) => {
  const { error: { details } } = productSchema.validate(body);
  const { message, type } = details[0];
  if (type === 'any.required') {
    return res.status(BAD_REQUEST).json({ message });
  }
  if (type === 'string.min') {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message });
  }
  next();
};

module.exports = { validateProduct };