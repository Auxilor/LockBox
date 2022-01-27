import { Command, SlashCommand, SlashCommandOptions, SlashCreator } from 'slash-create';
import Lockbox from '@Lockbox';
import { bot } from '@root/src/index';
import Logger from './Logger';

interface LockBoxSlashCommandOptions extends SlashCommandOptions {
	helpText?: string;
}

export default class BaseCommand extends SlashCommand {
	readonly helpText: string;
	
	readonly client: Lockbox;
	readonly log: (...args: any[]) => void;
	
	constructor(creator: SlashCreator, opts: LockBoxSlashCommandOptions) {
		super(creator, opts);
		
		this.helpText = opts.helpText ?? 'No Help Available';
		
		this.client = bot;
		this.log = Logger.info;
	}
}
