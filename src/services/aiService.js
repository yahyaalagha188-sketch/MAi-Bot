const { OpenAI } = require('openai');

const conversationHistory = new Map();

const fallbackReply = (message) => {
  const text = String(message || '').trim();
  if (!text) return 'أهلاً! ماذا تريد أن أساعدك به؟';

  return `أنا MAi-Bot، وأستطيع مساعدتك في: ${text}. إذا كنت تريد، أستطيع شرح، كتابة، تحليل، أو تحويل الفكرة إلى مشروع عملي.`;
};

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  try {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } catch (error) {
    console.error('OpenAI init error:', error);
    return null;
  }
}

async function getAIResponse(userMessage, userId = 'guest') {
  const safeMessage = String(userMessage || '').trim();

  if (!safeMessage) {
    return 'أهلاً! ماذا تريد أن أساعدك به؟';
  }

  const client = getClient();

  if (!client) {
    return fallbackReply(safeMessage);
  }

  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, []);
  }

  const history = conversationHistory.get(userId);
  history.push({ role: 'user', content: safeMessage });

  const recentHistory = history.slice(-12);

  try {
    const completion = await client.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'أنت مساعد ذكي، ودود، سريع، ومفيد. ترد باللغة العربية بشكل طبيعي ومرتب. لا تكتب ردوداً طويلة جدًا. قدم إجابات مفيدة ومباشرة.'
        },
        ...recentHistory
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const answer = completion.choices?.[0]?.message?.content || fallbackReply(safeMessage);

    history.push({ role: 'assistant', content: answer });

    return answer;
  } catch (error) {
    console.error('AI API error:', error.message || error);
    return fallbackReply(safeMessage);
  }
}

module.exports = {
  getAIResponse
};
