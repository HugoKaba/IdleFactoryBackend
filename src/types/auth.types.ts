import {ObjectId} from "mongodb";

export interface AuthRegisterBody {
    username: string
    password: string
}

export interface User {
    username: string
    password: string
    token: string
    createdAt: Date
    balance: number
    achievements: ObjectId[]
}

export interface SimpleUser {
    username: string
    createdAt: Date
}