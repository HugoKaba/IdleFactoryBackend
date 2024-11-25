import {ObjectId} from "mongodb";

export interface Offer {
    _id?: ObjectId;
    offer: {
        seller: ObjectId
        resource: ObjectId
        price: number
        quantity: number
        unitPrice: number
        buyer?: ObjectId
        createdAt: Date
        buyAt?: Date

    }
}

export interface OfferUpdate{
    offerId: string
    offer: {
        buyer?: string
        buyAt?: Date
    }
}
export interface updatePartialOffer {
    offerId: string
    update: {
        quantity: number
    }

    
}