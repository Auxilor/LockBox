import './util/MonkeyPatch';
import Lockbox from "./main";
import * as dotenv from 'dotenv';
import API from '@util/API';

dotenv.config()

const bot = new Lockbox(`${process.env['TOKEN']}`)

let verifyURL: string | null;

bot.launch().then(async () => {
  verifyURL = await API.generateUserVerifyURL();
});

export {
  bot,
  verifyURL
}