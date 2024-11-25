import { AuthRegisterBody } from '../../types/auth.types';
import { Express, Request, Response } from "express";
import { login, register,updateUserCredit } from "./auth.services";
import { requireLogin } from "./auth.middleware";

export function registerAuthRoutes(app: Express) {

    // on enregistre une route /auth/register
    // .                                        TypeParams, TypeQuery, TypeBody
    app.post('/auth/register', async (req: Request<unknown, unknown, AuthRegisterBody>, res: Response) => {

        // on call le service auth.register
        const result = await register(req.body)
        // on set un cookie si on a un token dans le result
        if (result.token) {
            res.cookie('token', result.token, { expires: new Date(+new Date() + 1000000000), sameSite: 'none', secure: true })
        }
        // on reponds a la requete http avec le result
        res.json(result)
        // res.status(500).send({message: "internal server error"})
    })

    app.post('/auth/login', async (req, res) => {
        const result = await login(req.body)
        // on set un cookie si on a un token dans le result
        if (result.token) {
            res.cookie('token', result.token, { expires: new Date(+new Date() + 1000000000), sameSite: 'none', secure: true })
        }
        res.json(result)
    })

    app.get('/auth/me', requireLogin, (req, res) => {
        res.json(req.user)
    })

    app.post('/auth/update-credit', requireLogin, async (req: Request, res: Response) => {
        const { username, credit } = req.body;

        try {
            const updatedUser = await updateUserCredit(username, credit);

            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating user credit:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}