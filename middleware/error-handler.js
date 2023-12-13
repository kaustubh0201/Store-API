const errorHandlerMiddleware = async (error, request, response, next) => {
  console.log(error);
  return response.status(500).json({ msg: 'Something went wrong, please try again!' });
};

module.exports = errorHandlerMiddleware;
