const { setError } =  require("../herlpers/utils.js");

const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(setError(400, error))
  }
}

module.exports = {
  validateSchema
}
