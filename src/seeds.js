const mongoose = require('mongoose');
const coupons = require('./controllers/coupons');

const random = () => Math.random() >= 0.7;
const nextInt = (min, max) => Math.round(Math.random() * (max - min) + min);

const Coupon = (args) => coupons.create(args);

mongoose.connect(process.env.DB_URL).then(async () => {
  for (let index = 0; index < 40; index++) {
      const off = {
        value: nextInt(1, 20) * 5,
        mark: random() ? '$' : '%'
      };

      const code = {
        prefix: random() ? 'CODE-' : '',
        postfix: random() ? '-PROMO' : ''
      };

      const uses = random() ? index : false;
      const description = random() ? `Description of coupon ${index + 1}` : undefined;

      const date = new Date;
      const nbf = random() ? date.setDate(date.getDate() + index) : undefined;
      const exp = random() ? date.setDate(date.getDate() + index + 1) : undefined;

      const coupon = await Coupon({off, code, uses, nbf, exp, description});
      console.log(coupon);
  }
});
