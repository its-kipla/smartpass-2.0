const visitService = require('../services/visit.service');
const Visit = require('../models/visit.model');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  res.json({ visits: await Visit.listAll(req.query.status) });
});

exports.approve = asyncHandler(async (req, res) => {
  res.json({ visit: await visitService.approve(req.params.id) });
});

exports.reject = asyncHandler(async (req, res) => {
  res.json({ visit: await visitService.reject(req.params.id, req.body.reason) });
});

exports.checkIn = asyncHandler(async (req, res) => {
  res.json({ visit: await visitService.checkIn(req.body.qrToken) });
});
