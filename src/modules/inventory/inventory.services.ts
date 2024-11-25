import { InventoryItems} from "../../db/models/InventoryItem";
import { InventoryItem } from "../../types/inventoryItem.types";
import {Resource} from "../../types/resource.types";
import {ObjectId} from "mongodb";


export async function getUserInventory(userId:ObjectId){
    const inventory = await InventoryItems.find({_id: userId})

    return {sucess: true, inventory}
}
export async function addToInventory(userId:ObjectId,body:Resource,rid: ObjectId){
    await InventoryItems.insertOne({
        resourceId: new ObjectId(rid),
        resource: body.name,
        amount: 0,
        owner: new ObjectId(userId)
    })

    return { success: true}
}

export async function updateAmount(inventoryId: ObjectId,body: InventoryItem,amount: number){
    await InventoryItems.updateOne({_id: inventoryId},{amount: body.amount + amount})

    return { success: true}
}