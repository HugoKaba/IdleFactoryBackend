import { InventoryItem } from "../../types/inventoryItem.types";
import { db } from "../mongo";

export const InventoryItems = db!.collection<InventoryItem>("invetoryitems")