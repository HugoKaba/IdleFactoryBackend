import { Offer, OfferUpdate, updatePartialOffer } from "../../types/offer.types";
import {Express, Request, Response} from "express";
import { buy, cancel, sell, getOffers, updateOffer} from "./market.services";
import {ObjectId} from "mongodb";
import {requireLogin} from "../auth/auth.middleware";

export function registerMarketRoutes(app: Express) {
    app.post('/market/offer', requireLogin, async (req: Request<unknown, unknown, Offer>, res: Response) => {
        const result = await sell(req.body)
        res.json(result)
    })

    app.post('/market/cancel', requireLogin, async (req: Request<unknown, unknown, OfferUpdate>, res: Response) => {
        console.log(req.body.offerId)
        const offerId = new ObjectId(req.body.offerId)
        const result = await cancel(offerId)

        res.json(result);
    })

    app.post('/market/buy', requireLogin, async (req: Request<unknown, unknown, OfferUpdate>, res: Response) => {
        const offerId = new ObjectId(req.body.offerId);
        if (req.user?._id) {
            const result = await buy(offerId, req.body);
            res.json(result);
        } else {
            res.status(400).json({ success: false, error: 'User ID is missing' });
        }
    });


    app.get('/market/offers', requireLogin, async (req: Request,res: Response) => {
        const result = await getOffers();
        req;
        res.json(result);
    });


    app.put('/market/update', requireLogin, async (req: Request<unknown, unknown, updatePartialOffer>, res: Response) => {
        const offerId = new ObjectId(req.body.offerId);
        if (req.user?._id) {
            console.log(req.body)
            const result = await updateOffer(offerId, req.body);
            res.json(result);
        } else {
            res.status(400).json({ success: false, error: 'User ID is missing' });
        }
    });
}
