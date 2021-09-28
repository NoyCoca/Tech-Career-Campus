const authUser = (req, res, next) => {
  if (req.body == null) {
    res
      .status(404)
      .json({ screen: false, massage: "you have to login or register" });
  }
  next();
};

const authRole = (Role) => {
    return (req, res, next) => { 
    if (req.body.role !== Role) {
        res
        .status(403)
<<<<<<< HEAD
        .json({
          success: false,
          message: "you don't have access",
        });
    } else {
      next();
    }
  };
=======
        .json({ success: false, massage: "you don't have access", error: error });
      } else {   
        next();
      }
    };
>>>>>>> 2f4a3804a7155d7931a5b878ef21ad0d6714ec96
};
module.exports = {
  authUser,
  authRole,
};
