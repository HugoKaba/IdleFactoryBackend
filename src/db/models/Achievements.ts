import { Achievement } from "../../types/achievement.types"
import { db } from "../mongo"

export const Achievements = db!.collection<Achievement>("achievements")