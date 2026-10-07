module.exports = (err, req, res, next) => {
  if (err.code === '23505') {
    return res.status(409).json({ error: 'That record already exists' });
  }
  if (err.code === '22P02') {
    return res.status(400).json({ error: 'Invalid id format' });
  }
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({
    error: status === 500 ? 'Something went wrong' : err.message,
    ...(err.details && { details: err.details }),
  });
};
