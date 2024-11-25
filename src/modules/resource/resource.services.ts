import { Resources } from "../../db/models/Resource";
export async function getAvailableResources(){
    const resources = await Resources.find({}).toArray()

    return {success: true, resources}
}