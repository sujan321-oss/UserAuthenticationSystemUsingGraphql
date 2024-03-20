
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4';


import createGraphQlServer from "./graphql";



async function init(){
     const app=express()

     

     app.use(express.json())
     app.use("/graphql", expressMiddleware(await createGraphQlServer()))

     app.listen(8001, () => {
        console.log("Listening to port number " + 8001)
     })
}

init()
