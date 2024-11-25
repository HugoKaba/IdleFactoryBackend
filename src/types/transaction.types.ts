import {ObjectId} from "mongodb";

export interface Transaction {
    buyer: ObjectId
    seller: ObjectId
    resource: ObjectId
    price: number
    amount: number
}