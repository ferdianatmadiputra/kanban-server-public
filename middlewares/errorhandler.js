const createError = require('http-errors');

module.exports = ((err, req, res, next) => {
  // console.log('>>>>>>>>>>>>>>>> isi err adalah',err, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< dari errorhandler', err.name);
  if (err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError") {
    let errors = err.errors.map((el) => el.message);
    res.status(400).json(createError(400, errors.join(', ')));
  } else if (err.name  === "JsonWebTokenError") {
    res.status(401).json(createError(401, err.message));
  } else if (err.name === "customError") {
    res.status(err.status).json(createError(err.status, err.msg));
  } else {
    res.status(500).json(createError(500, 'internal server error'));
  }
});
