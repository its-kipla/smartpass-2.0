const authService = require('../services/auth.service');
const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  res.status(201).json(await authService.register(req.body));
});

exports.login = asyncHandler(async (req, res) => {
  res.json(await authService.login(req.body));
});

exports.me = asyncHandler(async (req, res) => {
  res.json({ user: await User.findById(req.user.id) });
});
