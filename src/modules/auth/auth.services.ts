import { AuthRegisterBody, SimpleUser } from "../../types/auth.types";
import { Users } from "../../db/models/User";
import crypto from 'crypto'
import { WithId } from "mongodb";

export async function register(body: AuthRegisterBody) {
    const alreadyExist = await Users.findOne({ username: body.username })
    if (alreadyExist) {
        return { success: false, message: 'User already exists' }
    }

    const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex')
    const token = crypto.randomBytes(32).toString('hex')

    await Users.insertOne({
        username: body.username,
        password: hashedPassword,
        token: token,
        createdAt: new Date(),
        balance: 500,
        achievements: []
    })

    const dataUser ={
        username: body.username,
        createdAt: new Date(),
        balance: 500,
        achievements: []
    }

    return { success: true, token, user:dataUser }
}

export async function login(body: AuthRegisterBody) {
    const user = await Users.findOne({ username: body.username })
    if (!user) {
        return { success: false, message: 'Bad password' }
    }

    const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex')
    if (user.password !== hashedPassword) {
        return { success: false, message: 'Bad password' }
    }

    const token = crypto.randomBytes(32).toString('hex')
    await Users.updateOne({ _id: user._id }, { $set: { token } })

    return { success: true, token,data:user }
}

export function findByToken(token: string) {
    return Users.findOne<WithId<SimpleUser>>({ token }, { projection: { password: 0, token: 0 }})
}

export async function updateUserCredit(username: string, credit: number){
    try {
        const user = await Users.findOne({ username });

        if (user) {
            user.balance += credit;
            await Users.updateOne({ _id: user._id }, { $set: { balance: user.balance } });

            return Users.findOne<WithId<SimpleUser>>({ _id: user._id }, { projection: { password: 0, token: 0 } })
        }

        return null;
    } catch (error) {
        console.error('Error updating user credit:', error);
        throw error;
    }
}