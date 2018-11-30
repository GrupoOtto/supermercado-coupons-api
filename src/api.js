const status = require('http-status');
const coupons = require('./controllers/coupons');
const couponsValidator = require('./validators/coupons');

const handle = fn => (req, res, next) => fn(req, res, next).catch(next);

module.exports = app => {
  const resource = require('./utils/resource')(app);

  app.get(
    '/:id/valid',
    handle(async (req, res) => {
      const { id } = req.params;
      res.status(status.OK).json(await coupons.isValid(id));
    })
  );

  app.put(
    '/:id/use',
    handle(async (req, res) => {
      const { id } = req.params;
      res.status(status.OK).json(await coupons.use(id));
    })
  );

  resource('/', coupons, couponsValidator);
};
