const Joi = require('joi');

exports.dateSchema = [
  Joi.date(),
  Joi.object()
    .keys({
      $gt: Joi.date(),
      $gte: Joi.date(),
      $lt: Joi.date(),
      $lte: Joi.date(),
    })
    .or('$gt', '$gte', '$lt', '$lte')
    .unknown(false)
];

exports.numberSchema = [
  Joi.number(),
  Joi.object()
  .keys({
    $gt: Joi.number(),
    $gte: Joi.number(),
    $lt: Joi.number(),
    $lte: Joi.number()
  })
  .or('$gt', '$gte', '$lt', '$lte')
  .unknown(false)
];

exports.stringSchema = [
  Joi.string(),
  Joi.object()
  .keys({
    $regex: Joi.string()
  })
  .unknown(false)
];

exports.codeSchema = Joi.object()
  .keys({
      length: Joi.number(),
      prefix: Joi.string(),
      postfix: Joi.string(),
      pattern: Joi.string()
    }).unknown(false);

exports.offSchema = Joi.object().keys({
      value: Joi.number().min(0).when( 'mark', {
        is: '%',
        then: Joi.number().max(100)}
      ),
      mark: Joi.string()
    }).unknown(false);

exports.experationSchema = Joi.date()
  .when('nbf', {
    is: Joi.required(),
    then: Joi.date().greater(Joi.ref('nbf')),
  });
