const authUser = (req, res, next) => {
  if (req.body == null) {
    res
      .status(403)
      .json({
        success: false,
        message: "you have to login or register"
      });
  }
  next();
};

const authRole = (Role) => {
  return (req, res, next) => {
    if (req.body.role !== Role) {
      res
        .status(403)
        .json({
          success: false,
          message: "you don't have access",
        });
    } else {
      next();
    }
  };
};
module.exports = {
  authUser,
  authRole,
};
