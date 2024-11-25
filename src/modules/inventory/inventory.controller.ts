import {InventoryItem} from "../../types/inventoryItem.types";
import { Express, Request, Response } from "express";
import {addToInventory, getUserInventory, updateAmount} from "./inventory.services";
import {requireLogin} from "../auth/auth.middleware";
import {ObjectId} from "mongodb";
import {Resource} from "../../types/resource.types";

export function registerInventoryRoutes(app: Express){
    app.post('/inventory',requireLogin,async (req: Request<unknown,unknown,Resource>,res:Response)=>{
        const ressourceId = new ObjectId(req.query.rid as string);
        if (req.user?._id){
            const result = await addToInventory(req.user._id,req.body,ressourceId)
            res.json(result)
        }
    });

    app.get('/inventory', requireLogin,async (req: Request, res:Response)=>{
        if (req.user?._id){
            const result = await getUserInventory(req.user._id)
            res.json(result)
        }
    })

    app.put('/inventory',requireLogin,async (req:Request<unknown,unknown,InventoryItem>,res:Response)=>{
        const amount = parseInt(req.query.amount as string);
        const inventoryId = new ObjectId(req.query.id as string);
        const result = await updateAmount(inventoryId,req.body,amount)
        res.json(result);

    })

}