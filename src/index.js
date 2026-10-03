const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/health', require('./routes/health'));
app.use('/api/chat', require('./routes/chat'));

if (process.env.DISCORD_TOKEN) {
  require('./bot/discord');
} else {
  console.log('ℹ️ Discord token not set. Bot is disabled.');
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'الـ endpoint غير موجود',
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'حدث خطأ داخلي في السيرفر',
    detail: err.message || 'Unknown error'
  });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`✅ MAi-Bot يعمل على المنفذ ${PORT}`);
  console.log('🔗 API: http://localhost:' + PORT + '/api/health');
});

module.exports = app;
