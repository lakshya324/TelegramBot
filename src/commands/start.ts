import { Context } from 'telegraf';

export const startCommand = (ctx: Context) => {
  ctx.reply('Welcome! Use /create to get your unique link.');
};
