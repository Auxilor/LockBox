import req from 'petitio';
import cryptoRandomString from 'crypto-random-string';

export default class API {
    private static BASE_URL = 'https://api.polymart.org';
    static readonly NONCE = cryptoRandomString({length: 10});
    private static service = 'AuxilorVerification';

    public static generateUserVerifyURL = async (): NonNullable<Promise<string | null>> => {
        const fullres = await req(`${this.BASE_URL}/v1/generateUserVerifyURL`).query({
            service: this.service,
            nonce: this.NONCE
        }).json<GenerateUserVerifyURL>()
        let {response: res} = fullres

        if(res.success) return res.result.url
        
        this.checkErrors(fullres)

        return null
    }

    public static verifyUser = async (token: string): NonNullable<Promise<string | null>> => {

        const fullres = await req(`${this.BASE_URL}/v1/verifyUser`).query({
            service: this.service,
            nonce: this.NONCE,
            token
        }).json<VerifyUser>()
        let {response: res} = fullres

        if (res.success) return res.result.user.id;

        this.checkErrors(fullres)

        return null
    }

    public static getResourceUserData = async (resource_id: string | number, user_id: number, api_key: string): NonNullable<Promise<ResourceUserData | null>> => {
        const fullres = await req(`${this.BASE_URL}/v1/getResourceUserData`).query({
            api_key,
            resource_id,
            user_id
        }).json<getResourceUserData>()
        let {response: res} = fullres

        if(res.success) return res.resource;
        
        this.checkErrors(fullres)

        return null
    } 

    public static getUserData = async (user_id: string, api_key: string): NonNullable<Promise<getUserDataResponse | null>> => {
        const fullres = await req(`${this.BASE_URL}/v1/getUserData`, 'POST').body({
            api_key,
            user_id
        }).json<getUserData>()
        let {response: res} = fullres

        if(res.success) return res
        
        this.checkErrors(fullres)

        return null
    }
    //@ts-ignore
    public static async getResourceInfo(resource_id: number, api_key: string): Promise<ResourceInfo> {
        const fullres = await req(`${this.BASE_URL}/v1/getResourceInfo`).body({
            api_key,
            resource_id,
        }).json<getResourceInfo>()
        let {response: res} = fullres

        if(res.success) return res.resource;


        this.checkErrors(fullres)
    }

    private static checkErrors(response: any) {
        console.log(response)
        if (response.errors && response.errors.global)
            console.error(response.errors.global)

        console.log(response.data)
    }
}