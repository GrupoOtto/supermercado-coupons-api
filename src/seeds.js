const mongoose = require('mongoose');
const coupons = require('./controllers/coupons');

const random = () => Math.random() >= 0.7;
const nextInt = (min, max) => Math.round(Math.random() * (max - min) + min);

const Coupon = (args) => coupons.create(args);

mongoose.connect(process.env.DB_URL).then(async () => {
  const date = new Date;
  const oneUse = await Coupon({
    code: {
      pattern: "COUPON-1USE"
    },
    uses: 1,
    off: {
      value: 25,
      mark: "%"
    }
  });
  const infinity = await Coupon({
    code: {
      pattern: "COUPON-INFINITY"
    },
    uses: false,
    off: {
      value: 100,
      mark: "$"
    }
  });
  const expires = await Coupon({
    code: {
      pattern: "COUPON-EXPIRED"
    },
    off: {
      value: 50,
      mark: "%"
    },
    exp: date.setDate(date.getDate() - 10)
  });

  process.exit();
});
