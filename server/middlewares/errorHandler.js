const errorHandler = async (error, req, res, next) => {
  console.log(error);

  let statusCode = 0;
  let message = "";

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      // return error as an array
      // const errors = error.errors.map((err) => {
      //   return err.message;
      // });
      // message = errors;

      // return error as an object
      const errObj = {};
      error.errors.map((er) => {
        if (!errObj[er.path]) errObj[er.path] = er.message;
      });

      statusCode = 400;
      message = errObj;
      break;
    case "SequelizeForeignKeyConstraintError":
      statusCode = 400;
      if (message !== "") {
        message["categoryId"] = "Invalid Category";
      } else {
        message = {
          categoryId: "Invalid Category",
        };
      }
      break;
    case "LoginDataIsRequired":
      statusCode = 400;
      message = "Email or password is required";
      break;
    case "BarcodeError":
      statusCode = 400;
      message = "Failed to Generate Barcode";
      break;
    case "InvalidAccount":
      statusCode = 401;
      message = "Invalid email or password";
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid Token or Invalid Login";
      break;
    case "NotAuthorized":
      statusCode = 403;
      message = "Not Authorized to Delete Product";
      break;
    case "ProductNotFound":
      statusCode = 404;
      message = "Error Product Not Found";
      break;
    default:
      statusCode = 500;
      message = "Internal Server ERROR";
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
