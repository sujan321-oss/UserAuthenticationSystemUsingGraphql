
import { ApolloServer } from "@apollo/server";
import prisma from "../lib/db";
import { User } from "./user";


async function createGraphQlServer(){

    const gqlserver=new ApolloServer({
        typeDefs:`
        type Query {

            ${User.queries}

        }
        type Mutation {
            ${User.Mutation}
            
        }
        `,

        resolvers:{
            Mutation:{
                ...User.resolvers.mutations
          } ,
          Query:{
            ...User.resolvers.queries
          }
 
        }
     })
     await gqlserver.start()
     return gqlserver;


}

export default createGraphQlServer;

