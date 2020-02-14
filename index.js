const { LineBot, ConsoleBot} = require('bottender');
const { createServer } = require('@bottender/express');
const lineConfig = require('./bottender.config.js').channels.line;
const handler = require('./handler');

const useConsole = process.env.USE_CONSOLE === 'true';

const bot = 
   new LineBot({
      accessToken: lineConfig.accessToken,
      channelSecret: lineConfig.channelSecret,
      sendMethod: 'reply',
    });

/**
 *  初始化訂單
 */
bot.setInitialState({
    isOrdering: false,
    host: '',
    orders: [],
});

bot.onEvent(handler);

if (useConsole) {
  bot.createRuntime();
} else {
  const server = createServer(bot);
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`server is running on ${port} port...`);
  });
}