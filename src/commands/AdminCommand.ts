import { CommandContext, CommandOptionType, MessageOptions, SlashCreator } from 'slash-create'
import Command from '@util/Command'
import Database from '@util/Database';
import { User } from '@models/User';

export class AdminCommand extends Command {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: 'admin',
            guildIDs: '452518336627081236', // polymart server
            description: 'Lockbox Bot admin commands!',
            requiredPermissions: ['MANAGE_GUILD'],
            options: [
                {
                    type: CommandOptionType.SUB_COMMAND,
                    name: 'unlink',
                    description: 'Unlink discord user',
                    options: [
                        {
                            name: 'userid',
                            description: 'Userid to unlink',
                            type: CommandOptionType.STRING,
                            required: true,
                        },
                    ],
                }
            ]
        })
        this.filePath = __filename
    }

    async run(ctx: CommandContext): Promise<MessageOptions> {
        const manager = await Database.getInstance().getManager();

        // What options are there
        const key = Object.keys(ctx.options)[0]
        const options = ctx.options[key]

        switch (key) {
            case 'unlink':
                const users = manager.getRepository(User);
                console.log(await users.query('SELECT * FROM "user"'));
                (await users.findOne(ctx.member!.id))?.remove()
                console.log(await users.query('SELECT * FROM "user"'));

                return { content: 'Unlinked user!', ephemeral: true }
            default:
                return { content: 'Not implemented yet!', ephemeral: true }
        }

    }
}