import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Config } from './Config'

@Entity()
export class Resource extends BaseEntity {
    constructor(resource: ResourceInfo, role?: string) {
        // console.log('resource')
        // let sCallerName;
        // let re = /([^(]+)@|at ([^(]+) \(/g;
        // let aRegexResult = re.exec(new Error().stack!);
        // sCallerName = aRegexResult![1] || aRegexResult![2];
        // console.log(`Constructor Caller: ${sCallerName}`)
        super()
        if (resource) this.Id = resource.id
        if (role) this.discordRole = role
    }

    @PrimaryColumn()
    Id: string

    @Column({ nullable: true })
    discordRole: string

    @ManyToOne(() => Config, config => config.resources, {
        createForeignKeyConstraints: false,
        primary: true
    })
    guild?: Config

}