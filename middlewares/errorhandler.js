module.exports = (err, req, res, next) => {
  console.log(err, '<<< dari errorhandler');
  if (err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError") {
    let errors = err.errors.map((el) => el.message);
    res.status(400).json({ errors });
  } else if (err.name  === "JsonWebTokenError") {
    res.status(401).json({message: "Invalid token"})
  } else if (err.name === "customError") {
    res.status(err.status).json({ message: err.msg });
  } else {
    res.status(500).json({
      errormessage: "Internal server error",
      err,
    });
  }
};
