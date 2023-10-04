import { setError } from "../herlpers/utils.js"

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(setError(400, error))
  }
}