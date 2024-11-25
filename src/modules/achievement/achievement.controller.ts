import {requireLogin} from "@/modules/auth/auth.middleware";
import {Express, Request, Response} from "express";
import {
    getAchievementByName,
    updateUserAchievement
} from "@/modules/achievement/achievement.services";


export function registerAchievementsRoutes(app: Express){
    // app.get('/achievements',requireLogin,async (req: Request,res: Response)=>{
    //     const result = await getAllAchievements()
    //     console.log(req)
    //     res.json(result)
    // })

    app.put('/achievements/update/me',requireLogin,async (req:Request,res:Response)=>{
        await updateUserAchievement(req.body.user, req.body.achievement)

        res.json({message:"successfully added achievement"})
    })

    app.get('/achievements/success/',requireLogin,async (req:Request,res: Response)=>{
        //sends back event info by its name
        const result = await getAchievementByName(req.query.achievementName)
        res.json(result)
    })
}