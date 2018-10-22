const error = require('http-errors');
const voucher_codes = require('voucher-code-generator');
const Coupon = require('../models/Coupon');

exports.all = async (args) => Coupon.find(args);

exports.get = async code => Coupon.findOne({ code });

exports.delete = async code => Coupon.deleteOne({ code });

exports.update = async (code, args) => {
  if (args.code){
    args = {...args, code: voucher_codes.generate(args.code)};
  }
  return await Coupon.findOneAndUpdate({ code }, args);
};

exports.create = async (args) => {
  const code = voucher_codes.generate(args.code);
  if (args.uses === undefined){
    args.uses = 1;
  } else if(args.uses === false || args.uses === -1){
    args.uses = undefined;
  }

  return await Coupon.create({...args, code });
};

exports.isValid = async (code) => {
  const coupon = await Coupon.findOne({ code });
  if (coupon){
    return {valid: coupon.isValid()};
  }
}

exports.use = async (code) => {
  const coupon = await Coupon.findOne({ code });
  if(!coupon){
    throw error(404, "Coupon not found");
  }

  if(!coupon.isValid()){
    throw error(410, "Invalid coupon");
  }

  if(coupon.uses){
    coupon.uses = coupon.uses - 1;
    coupon.save();
  }
  return coupon
}
