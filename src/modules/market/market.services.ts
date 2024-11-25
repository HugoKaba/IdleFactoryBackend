import { Offers } from "../../db/models/Offer";
import { Offer, OfferUpdate, updatePartialOffer } from "../../types/offer.types";
import { ObjectId } from "mongodb";

export async function buy(offerId: ObjectId, body: OfferUpdate) {
    try {
        await Offers.updateOne(
            { _id: offerId },
            {
                $set: {
                    "offer.buyer": body.offer.buyer,
                    "offer.buyAt": body.offer.buyAt,
                },
            }
        );
        return { success: true, message: 'Offer successfully updated' };
    } catch (error) {
        console.error('Error in buy function:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}

export const updateOffer = async (offerId: ObjectId, update: updatePartialOffer) => {
    try {
        
        const updateQuery: Record<string, any> = {};
        if (update.update.quantity) {
            updateQuery['offer.quantity'] = update.update.quantity;
        }
        const result = await Offers.updateOne(
            { _id: offerId },
            {
                $set: updateQuery,
            }
        );
        console.log(result)
        return result;
    } catch (error) {
        throw error;
    }
};



export async function cancel(offerId: ObjectId) {
    try {
       const result = await Offers.deleteOne({
            _id: offerId
        });
        console.log(result)
        return { success: true, message: 'Offer successfully deleted' };
    } catch (error) {
        console.error('Error in cancel function:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}

export async function getOffers() {
        const offers = await Offers.find({}).toArray()
        return { success: true, offers };
}

export async function sell(body: Offer) {
    try {
        await Offers.insertOne({
            
            offer: {
                seller: body.offer.seller,
                resource: body.offer.resource,
                price: body.offer.price,
                quantity: body.offer.quantity,
                createdAt: body.offer.createdAt,
                unitPrice: body.offer.unitPrice,
            },
        });

        return { success: true, message: 'Offer successfully created' };
    } catch (error) {
        console.error('Error in sell function:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}
