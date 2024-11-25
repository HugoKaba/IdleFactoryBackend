import {Express, Request, Response} from "express";
import {requireLogin} from "../auth/auth.middleware";
import {getAvailableResources} from "./resource.services";

export function registerResourceRoutes(app: Express){
    app.get('/resources',requireLogin,async (req:Request, res:Response)=>{
        const result = await getAvailableResources()
        console.log(req)
        res.json(result)
    })
}