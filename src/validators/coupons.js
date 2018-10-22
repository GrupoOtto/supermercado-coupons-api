const Joi = require('joi');

const {
  numberSchema,
  stringSchema,
  dateSchema,
  codeSchema,
  offSchema,
  experationSchema
} = require('../utils/validations');

exports.all = {
  query: {
    uses: numberSchema,
    description: stringSchema,
    nbf: dateSchema,
    exp: dateSchema,
    code: stringSchema,
    off: Joi.object().keys({
      value: numberSchema,
      mark: Joi.string(),
    }).unknown(false)
  }
};

exports.create = {
 body: {
    uses: Joi.number().min(0),
    description: Joi.string(),
    nbf: Joi.date(),
    exp: experationSchema.required(),
    code: codeSchema.required(),
    off: offSchema.required()
  }
};

exports.update = {
 body: {
    uses: Joi.number().min(0),
    description: Joi.string(),
    nbf: Joi.date(),
    exp: experationSchema.required(),
    code: codeSchema.required(),
    off: offSchema.required()
  }
};

exports.patch = {
 body: {
    uses: Joi.number().min(0),
    description: Joi.string(),
    nbf: Joi.date(),
    exp: experationSchema,
    code: codeSchema,
    off: offSchema
  }
};

exports.get = {};

exports.delete = {};

