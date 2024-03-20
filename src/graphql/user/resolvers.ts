import { TokenPayload, UserPayload, UserService } from "../../services/user"

const queries = {
    getUserToken: async (_: any, payload: TokenPayload) => {
        const token = await UserService.getUserToken(payload)
        return token
    }
}


const mutations = {
    createUser: async (_: any, payload: UserPayload) => {

        const res = await UserService.createUser(payload)
        return res.id;
    }
}




export const resolvers = { queries, mutations }