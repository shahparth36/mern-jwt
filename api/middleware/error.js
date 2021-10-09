const { UnauthorizedError, ValidationError } = require("../constants/error");

function handleError(err, req, res, next) {
  switch (true) {
    case err.name === UnauthorizedError:
      return res
        .status(err.statusCode)
        .json({ type: UnauthorizedError, message: err.message });

    case err.type === ValidationError:
      return res
        .status(err.statusCode)
        .json({ type: ValidationError, message: err.message });

    case err.isBoom:
      const {
        statusCode,
        payload: { error },
      } = err.output;
      return res.status(statusCode).json({ type: error, message: err.message });

    case err.isHttpError:
      return res
        .status(err.statusCode)
        .json({ type: err.name, message: err.message });

    default:
      return res.status(500).json({
        type: "Internal Server Error",
        message: "An internal server error has occurred",
      });
  }
}

module.exports = {
  handleError,
};
