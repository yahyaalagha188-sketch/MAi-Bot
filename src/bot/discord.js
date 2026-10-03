const { Client, GatewayIntentBits } = require('discord.js');
const { getAIResponse } = require('../services/aiService');

if (!process.env.DISCORD_TOKEN) {
  module.exports = null;
} else {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
    ]
  });

  client.once('ready', () => {
    console.log(`✅ Discord bot ready: ${client.user.tag}`);
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const isMentioned = message.mentions.has(client.user);
    const isDM = message.channel.isDMBased();

    if (!isMentioned && !isDM) return;

    try {
      await message.channel.sendTyping();
      const content = message.content.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();
      const answer = await getAIResponse(content || 'مرحبا', message.author.id);

      const chunks = answer.match(/.{1,2000}/gs) || [answer];
      for (const chunk of chunks) {
        await message.reply(chunk);
      }
    } catch (error) {
      console.error('Discord message error:', error);
      await message.reply('⚠️ حدث خطأ أثناء معالجة رسالتك، حاول مرة أخرى لاحقاً.');
    }
  });

  client.login(process.env.DISCORD_TOKEN);

  module.exports = client;
}
