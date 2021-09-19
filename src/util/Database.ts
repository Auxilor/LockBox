import { Connection, createConnection, EntityManager, EntityTarget, Repository } from 'typeorm'

export default class Database { 
    private static instance = new Database();
    public static getInstance: () => Database = () => Database.instance;

    private conn: Connection;

    private constructor() {}

    getRepo = async (repo: EntityTarget<any>): Promise<Repository<any>> => {
        return (await this.getConnection()).manager.getRepository(repo);
    }

    private getConnection = async (): Promise<Connection> => {
        if(!this.conn) this.conn = await createConnection();

        return this.conn;
    }

    test = async (): Promise<boolean> => {
        return (await this.getConnection()).isConnected;
    }

    getManager = async (): Promise<EntityManager> => {
        return (await this.getConnection()).manager;
    }
}