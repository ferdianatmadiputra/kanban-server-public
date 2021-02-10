const createError = require('http-errors');

module.exports = ((err, req, res, next) => {
  // console.log('>>>>>>>>>>>>>>>> isi err adalah',err, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< dari errorhandler', err.name);
  if (err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError") {
    let errors = err.errors.map((el) => el.message);
    res.status(400).json({ message: errors.join(', ') });
  } else if (err.name  === "JsonWebTokenError") {
    res.status(401).json({ message: err.message });
  } else if (err.status && err.message) {
    res.status(err.status).json({ message: err.message});
  } else {
    res.status(500).json({message: 'Internal server error'})
  }
});
