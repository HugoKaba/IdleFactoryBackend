import { Factory } from '../../types/factory.types'
import { Express, Request, Response } from "express";
import { getPlayerFactory, sell, create, upgradeFactory } from  "./factory.services"
import {requireLogin} from "../auth/auth.middleware";
import {ObjectId} from "mongodb";

export function registerFactoryRoutes(app: Express){
   app.post('/factory/create',requireLogin,async (req: Request<unknown,unknown,Factory>, res: Response)=>{

       if(req.user?._id){
           const result = await create(req.body,req.user._id)
           res.json(result)
       }
    })

    app.get('/factory/me',requireLogin,async(req: Request<unknown,unknown,Factory>,res: Response)=>{
        if(req.user?._id){
            const result = await getPlayerFactory(req.user?._id)
            res.json(result)
        }
    })

    app.delete('/factory/sell',requireLogin,async(req: Request,res: Response)=>{
       const id = req.query.id;
       const factoryId = new ObjectId(id as string);
       const result = await sell(factoryId);

       res.json(result)
    })

    app.put('/factory/levelUp',requireLogin,async(req:Request<unknown,unknown,Factory>,res:Response)=>{
        const id = req.query.id;
        const factoryId = new ObjectId(id as string)
        const result = await upgradeFactory(factoryId,req.body)

        res.json(result)
    })
}