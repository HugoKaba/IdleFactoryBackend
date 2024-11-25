import {ObjectId} from "mongodb";

export interface InventoryItem {
    resourceId: ObjectId
    resource: string
    amount: number
    owner: ObjectId
}