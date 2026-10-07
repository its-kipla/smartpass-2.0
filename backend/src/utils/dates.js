// Today's date (YYYY-MM-DD) in Nairobi time, regardless of server timezone.
const todayInNairobi = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' });

module.exports = { todayInNairobi };
