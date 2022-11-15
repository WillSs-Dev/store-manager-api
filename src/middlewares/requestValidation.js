const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const validateProduct = ({ body: { name } }, res, next) => {
  if (name === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length myst be at least 5 characters long' });
  }
  next();
};

module.exports = { validateProduct };