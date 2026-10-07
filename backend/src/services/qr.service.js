const QRCode = require('qrcode');

// The QR code simply encodes the visit's secret token.
// The gate scanner sends that token to POST /api/admin/check-in.
const OPTIONS = { errorCorrectionLevel: 'M', margin: 2, width: 320 };

// "data:image/png;base64,..." string, ready for <img src="...">
exports.toDataUrl = (token) => QRCode.toDataURL(token, OPTIONS);

// Raw PNG bytes, used as an email attachment
exports.toPngBuffer = (token) => QRCode.toBuffer(token, OPTIONS);
