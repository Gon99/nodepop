'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() {
  return function(req, res, next) {
    const token = req.get('Authorization') || req.query.token || req.body.token || req.cookies.token;

    if (!token) {
      const error = new Error('no token provided');
      error.status = 401;
      next(error);
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        const error = new Error('invalid token');
        error.status = 401;
        next(error);
        return;
      }
      req.apiAuthUserId = payload._id;
      next();
    });
  };
}