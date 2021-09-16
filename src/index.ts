import './util/MonkeyPatch';
import Lockbox from "./main";
import * as dotenv from 'dotenv';

dotenv.config()

const bot = new Lockbox(`${process.env['TOKEN']}`)

bot.launch();

export {
  bot
}