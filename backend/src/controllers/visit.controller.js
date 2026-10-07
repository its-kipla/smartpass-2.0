const visitService = require('../services/visit.service');
const Visit = require('../models/visit.model');
const VisitType = require('../models/visitType.model');
const asyncHandler = require('../utils/asyncHandler');

exports.listTypes = asyncHandler(async (req, res) => {
  res.json({ visitTypes: await VisitType.listActive() });
});

exports.create = asyncHandler(async (req, res) => {
  res.status(201).json({ visit: await visitService.create(req.user.id, req.body) });
});

exports.listMine = asyncHandler(async (req, res) => {
  res.json({ visits: await Visit.listByUser(req.user.id) });
});

exports.cancel = asyncHandler(async (req, res) => {
  res.json({ visit: await visitService.cancel(req.params.id, req.user.id) });
});

exports.getPass = asyncHandler(async (req, res) => {
  res.json(await visitService.getPass(req.params.id, req.user.id));
});
