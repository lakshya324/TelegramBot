import { Context } from 'telegraf';
import { v4 as uuidv4 } from 'uuid';
import {UserLinkDB} from '../models/user.link';
import { serverURL } from '../config/config.env';

export const createCommand = async (ctx: Context) => {
  const telegramUserId = ctx.message?.from?.id;
  if (!telegramUserId) return ctx.reply('Could not identify user.');

  const uuid = uuidv4();

  try {
    await UserLinkDB.findOneAndUpdate(
      { telegramUserId },
      { uuid },
      { new: true, upsert: true }
    );

    const linkUrl = `${serverURL}/link/${uuid}`;
    ctx.reply(`Your unique link: ${linkUrl}`);
  } catch (error) {
    console.error('Error creating user link:', error);
    ctx.reply('An error occurred. Please try again.');
  }
};
