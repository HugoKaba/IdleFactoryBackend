import { Offer } from "../../types/offer.types";
import { db } from "../mongo";

export const Offers = db!.collection<Offer>('offers')