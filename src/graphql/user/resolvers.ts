import { TokenPayload, UserPayload, UserService } from "../../services/user"

// this is for the querying the json token for the authentcation 
const queries = {
    getUserToken: async (_: any, payload: TokenPayload) => {
        const token = await UserService.getUserToken(payload)
        return token
    }
}

// this thing used for the signup purpose 
const mutations = {
    createUser: async (_: any, payload: UserPayload) => {

        const res = await UserService.createUser(payload)
        return res.id;
    }
}



export const resolvers = { queries, mutations }