import mongoose, { Schema, Document } from "mongoose";

interface IUserLink extends Document {
  telegramUserId: number;
  uuid: string;
}

const userLinkSchema: Schema = new Schema({
  telegramUserId: { type: Number, required: true, unique: true },
  uuid: { type: String, required: true, unique: true },
});

export const UserLinkDB = mongoose.model<IUserLink>("UserLink", userLinkSchema);
