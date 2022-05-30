import { tourActivitiesPrice } from "./tourActivitiesPrice";

export interface tourActivities {
    name: number;
    shortDescription: string;
    taing: string;
    picture: string;
    price: tourActivitiesPrice;
    description: string;
    rating: number;
    imageUrl: string;
}