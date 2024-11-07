import { Telegraf } from 'telegraf';
import { telegramBotToken } from './config/config.env';
import { connectToDatabase } from './models/connect';
import { startCommand } from './commands/start';
import { createCommand } from './commands/create';

const bot = new Telegraf(telegramBotToken);


bot.start(startCommand);
bot.command('create', createCommand);


(async () => {
  await connectToDatabase();
  bot.launch();
  console.log('Bot started!');
})();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
