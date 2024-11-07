import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 5000;
export const mongoDbUri = process.env.MONGODB_URI!;
// export const db_config = {
//   host: process.env.DB_HOST!,
//   user: process.env.DB_USER!,
//   password: process.env.DB_PASSWORD!,
//   name: process.env.DB_NAME!,
//   port: +process.env.DB_PORT!,
//   dialect: process.env.DB_DIALECT!,
// };
export const ipExpireTime = +process.env.IP_EXPIRE_TIME!; // in mins
export const ipRateLimit = +process.env.IP_RATE_LIMIT!;

export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN!;
export const serverURL = process.env.SERVER_URL!;