const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');

const signToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

exports.register = async ({ fullName, email, phone, password }) => {
  if (await User.findByEmail(email)) throw new AppError(409, 'Email is already registered');
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ fullName, email, phone, passwordHash });
  return { user, token: signToken(user) };
};

exports.login = async ({ email, password }) => {
  const row = await User.findByEmail(email);
  // Same message for unknown email and wrong password, so emails can't be probed.
  const ok = row?.password_hash && (await bcrypt.compare(password, row.password_hash));
  if (!ok) throw new AppError(401, 'Invalid email or password');
  const user = await User.findById(row.id);
  return { user, token: signToken(user) };
};
