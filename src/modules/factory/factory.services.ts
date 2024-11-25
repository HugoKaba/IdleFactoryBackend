import {Factory} from "../../types/factory.types";
import {Factories} from "../../db/models/Factory";
// import { Users } from "../../db/models/User";

import { ObjectId } from "mongodb";


export async function getPlayerFactory(userId: ObjectId){
    const factories = await Factories.find({owner: userId})
    return {success: true, factories}
}

export async function upgradeFactory(factoryId: ObjectId,body: Factory){
    const newLevel = body.level + 1
    await Factories.updateOne({_id: factoryId},{level: newLevel })
}

export async function create(body: Factory, _user: ObjectId ) {
    await Factories.insertOne(
        {
            price: body.price,
            prodtype: body.prodtype,
            production: body.production,
            level: 1,
            owner: _user,
            resourceCost: body.resourceCost
            }
        )

    return { success: true, message: 'Succesfully bought factory'}
}

export async function sell(id: ObjectId){
    const factoryId = new ObjectId(id);
    //handle refund elsewhere
    await Factories.deleteOne({_id: factoryId});
}
