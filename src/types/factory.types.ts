import {ObjectId} from "mongodb";

export interface Factory {
    price: number
    prodtype: string // resource produced
    production: number
    level: number
    owner: ObjectId // ObjectID de l'owner ou alors magouille incoming
    resourceCost: object// signature that allows for any number of ressource as long as it is a string:number
}