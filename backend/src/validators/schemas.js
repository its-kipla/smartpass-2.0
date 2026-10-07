const { z } = require('zod');

const register = z.object({
  fullName: z.string().trim().min(2, 'Full name is required'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().min(7).max(20).optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const login = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, 'Password is required'),
});

const createVisit = z.object({
  visitTypeId: z.number().int().positive(),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  purpose: z.string().trim().max(500).optional(),
});

const reject = z.object({
  reason: z.string().trim().min(3, 'Give a short reason'),
});

const checkIn = z.object({
  qrToken: z.string().min(10),
});

module.exports = { register, login, createVisit, reject, checkIn };
