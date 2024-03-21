import prisma from "../lib/db";
import { createHmac, randomBytes } from 'node:crypto'
import jwt from 'jsonwebtoken'

const SECRET_KEY = "@superMan@3123"

export interface UserPayload {
    name: string,
    email: string,
    password: string,

}

export interface TokenPayload {
    email: string,
    password: string
}


export class UserService {


    private static generateHashedPassword(salt: string, password: string) {
        return createHmac('sha256', salt).update(password).digest('hex')
    }




    public static createUser(payload: UserPayload) {
        const { name, email, password } = payload
        const salt = randomBytes(32).toString("hex")
        const hashedpassword = UserService.generateHashedPassword(salt, password)

        return prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedpassword,
                salt: salt
            }
        })

    }

    private static async findUserByemail(email: string) {
        return await prisma.user.findUnique({ where: { email } })
    }


    public static async getUserToken(payload: TokenPayload) {
        const { email, password } = payload;
        const user = await UserService.findUserByemail(email)
        if (!user) throw new Error("login with the valid email")

        const hashedpassword = UserService.generateHashedPassword(user.salt, password)
        if (user.password != hashedpassword) throw new Error("Wrong password")


        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY)
        return token
    }




}