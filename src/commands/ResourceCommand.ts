import { Config } from "@models/Config"
import { Resource } from "@models/Resource"
import API from "@util/API"
import Command from "@util/Command"
import Database from "@util/Database"
import { CommandContext, CommandOptionType, SlashCreator } from "slash-create"

export class ResourceCommand extends Command {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: 'resource',
            description: 'Set resource options!',
            requiredPermissions: ['MANAGE_GUILD'],
            options: [
                {
                    name: 'config',
                    description: 'Set the role for the resource',
                    type: CommandOptionType.SUB_COMMAND,
                    options: [
                        {
                            name: 'resourceid',
                            description: 'Resource ID from Polymart',
                            required: true,
                            type: CommandOptionType.INTEGER,
                        },
                        {
                            name: 'role',
                            description: 'Role to assign user if they have this resource when verifying',
                            required: true,
                            type: CommandOptionType.ROLE,
                        },
                    ]
                },
                {
                    name: 'list',
                    description: 'list all set Resources set.',
                    type: CommandOptionType.BOOLEAN,
                    required: false
                }
            ]
        })
        this.filePath = __filename
    }

    async run(ctx: CommandContext) {
        const manager = await Database.getInstance().getManager()
        const config = await manager.findOne(Config, ctx.guildID)
        if (!config) return { content: 'Bot has not been configured correctly.', ephemeral: true }
        
        const key = Object.keys(ctx.options)[0]

        if (!config.apiKey) {
            return {
                content: 'Bot has not been configured correctly. Missing API KEY',
                ephemeral: true,
            }
        }
        
        switch (key) {
            case 'config':
                console.log(config)
                let response: ResourceInfo;
                if (typeof ctx.options[key]['resourceid'] !== 'undefined') {
                    response = (await API.getResourceInfo(ctx.options[key]['resourceid'], config.apiKey))!
                    
                    if (response === null) return { content: 'Resource not found!', ephemeral: true }
                }

                //#region

                //@Jpuf0
                /*
                * Variable 'response' is used before being assigned.ts(2454)
                */
                
                const pain = (await API.getResourceInfo(ctx.options[key]['resourceid'], config.apiKey))!;
                
                //#endregion
                const resources = await config.resources
                const resource = resources.find(r => r.Id === response.id)
                
                console.log('Function call once')
                if (resource) resource.discordRole = ctx.options[key]['role']
                else {
                    let pensive = new Resource(pain, ctx.options[key]['role'])
                    pensive.guild = config!
                    resources.push(pensive)
                }

                config.resources = Promise.resolve(resources)
                await config.save()
                return {
                    content: response!.title + ' role updated to <@&' + ctx.options[key]['role'] + '>',
                    ephemeral: true,
                }
            default:
                return { content: 'Not implemented yet!', ephemeral: true }
        }
    }
}