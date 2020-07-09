const jwt = require('jsonwebtoken');
const apiResponse = require("../helpers/responses");

if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv').config()
}

module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        req.user = { userId };
        next();
      }
    } catch {
      return apiResponse.unauthorised(res, 'Invalid request')
    }
  } else {
    return apiResponse.unauthorised(res, 'No auth headers')
  }
}