import { Resource } from "../../types/resource.types"
import { db } from "../mongo"

export const Resources = db!.collection<Resource>('resources')