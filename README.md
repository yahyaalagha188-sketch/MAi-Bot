# MAi-Bot 🤖

بوت ذكي يعمل كخادم AI، ويمكن ربطه بـ Discord أو استخدامه عبر API REST.

## المميزات

- API سريع عبر Express
- استجابة AI ذكية
- دعم العربية
- دعم Discord Bot
- جاهز للتوسع

## التشغيل السريع

1. تثبيت الحزم:

```bash
npm install
```

2. إعداد المتغيرات:

```bash
cp .env.example .env
```

3. أضف مفتاح OpenAI إذا أردت الرد الحقيقي:

```env
OPENAI_API_KEY=your_key_here
```

4. شغّل المشروع:

```bash
npm start
```

## الروابط السريعة

- الصحة: http://localhost:3000/api/health
- إرسال رسالة: POST http://localhost:3000/api/chat/message

## مثال JSON

```json
{
  "message": "مرحبا، كيف حالك؟",
  "userId": "user123"
}
```

## مثال curl

```bash
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message":"مرحبا","userId":"u1"}'
```

## بنية المشروع

```text
MAi-Bot/
├── src/
│   ├── bot/
│   │   └── discord.js
│   ├── routes/
│   │   ├── chat.js
│   │   └── health.js
│   ├── services/
│   │   └── aiService.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── .env
```

## ملاحظات مهمة

- إذا لم يتم تعيين `OPENAI_API_KEY`، فالبوت سيستخدم رد احتياطي ذكي ومحلي.
- إذا لم يتم تعيين `DISCORD_TOKEN`، فلن يعمل البوت على Discord.
- هذا المشروع قابل للتعديل ليصبح bot أكبر وأكثر ذكاءً في المستقبل.
