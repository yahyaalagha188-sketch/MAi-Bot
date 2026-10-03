const express = require('express');
const router = express.Router();
const { getAIResponse } = require('../services/aiService');

router.post('/message', async (req, res) => {
  try {
    const { message, userId = 'guest' } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'الرسالة مطلوبة'
      });
    }

    const response = await getAIResponse(message, userId);

    return res.json({
      success: true,
      message: message.trim(),
      response,
      userId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return res.status(500).json({
      success: false,
      error: 'فشل في معالجة الرسالة',
      detail: error.message
    });
  }
});

module.exports = router;
