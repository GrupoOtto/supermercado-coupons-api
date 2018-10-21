const status = require('http-status');

const handle = fn => (req, res, next) => fn(req, res, next).catch(next);

module.exports = app => {};
