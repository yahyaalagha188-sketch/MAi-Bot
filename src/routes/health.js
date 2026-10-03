const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'online',
    message: '✅ السيرفر يعمل بشكل طبيعي',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
