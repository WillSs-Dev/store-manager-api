const joi = require('joi');

const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const productSchema = joi.object({
  name: joi.string().alphanum().min(5).required(),
});

const validateProduct = ({ body }, res, next) => {
  const { error } = productSchema.validate(body);
  if (error) {
    const { message, type } = error.details[0];
    if (type === 'any.required') {
      return res.status(BAD_REQUEST).json({ message });
    }
    if (type === 'string.min') {
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
  }
  next();
};

const saleSchema = joi.array().items(
  joi.object({
    productId: joi.number().required(),
    quantity: joi.number().min(1).required(),
  }),
);

const validateSale = ({ body }, res, next) => {
  const { error } = saleSchema.validate(body);
  if (error) {
    const { path, type } = error.details[0];
    if (type === 'any.required') {
      return res
        .status(BAD_REQUEST)
        .json({ message: `"${path[1]}" is required` });
    }
    if (type === 'number.min') {
      return res
        .status(UNPROCESSABLE_ENTITY)
        .json({ message: `"${path[1]}" must be greater than or equal to 1` });
    }
  }
  next();
};

module.exports = { validateProduct, validateSale };
