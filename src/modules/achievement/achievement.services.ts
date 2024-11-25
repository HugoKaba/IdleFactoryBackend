import {Achievements} from "@/db/models/Achievements";
import {ObjectId} from "mongodb";
import {Users} from "@/db/models/User";
import {Achievement} from "@/types/achievement.types";

export async function getAchievementByName(params: any){

    const achievement = await Achievements.findOne({name:params})
    return {success: true, achievement}
}

export async function updateUserAchievement(user: any, achievement: Achievement){
    const achievements = user.achievements
    //if achievementId is in achievements return
    const userObjectId = new ObjectId(user._id)
    achievements.push(achievement)
    try{
        const result = await Users.updateOne({_id: userObjectId},
            {
                $set:{
                    achievements:achievements
                }
            })
        if (result.modifiedCount === 0) {
            // No documents were updated
            console.log("No documents were updated.");
        } else {
            // Documents were updated
            console.log(`Updated ${result.modifiedCount} document(s).`);
        }
    }catch(e){
        console.error(e)
    }
}

// export async function getAllUserAchievements(){
//     const achievements = await Users.find({}).toArray()
//     return { success:true,achievements}
// }