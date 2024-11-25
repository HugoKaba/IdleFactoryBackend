import { Factory } from "../../types/factory.types";
import { db } from "../mongo";

export const Factories = db!.collection<Factory>('factories')