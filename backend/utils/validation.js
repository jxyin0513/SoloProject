const { validationResult } = require('express-validator');
const multer = require('multer');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => `${error.msg}`);

      const err = Error('Bad request.');
      err.errors = errors;
      err.status = 400;
      err.title = 'Bad request.';
      next(err);
    }
    // if(error instanceof multer.MulterError){

    // }
    next();
  };

  module.exports = {
    handleValidationErrors
  };
