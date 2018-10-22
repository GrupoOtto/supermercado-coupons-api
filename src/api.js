const status = require('http-status');
const coupons = require('./controllers/coupons');
const couponsValidator = require('./validators/coupons');

const handle = fn => (req, res, next) => fn(req, res, next).catch(next);

module.exports = app => {
  const resource = require('./utils/resource')(app);
  resource('/', coupons, couponsValidator);
};
