import {EventType, VenueImage, MealPrice, VenueDish} from '../../models/venue'
export interface VenueInformationState {
    name: string;
    listingName: string;
    roomName: string;
    commission: number;
    email: string;
    phoneNumber: string;
    phoneExt: string;
    contactName: string;
    description: string;
    venueType: string;
    googleReviewRating: number;
    googleReviewQty: number;
    address: string;
    city: string;
    neighbourhood: string;
    fullAddress: string;
    iGuideLink: string,
    seatedCapacity: number,
    standingCapacity: number,
    minCapacity: number,
    rentalFee: number,
    amenities: string[],
    foodDrinkOptions: string[],
    cuisineOptions: string[],
    lookFeels: string[],
    eventType: EventType,
    images: VenueImage[],
    featuredImageUrl: string,
    lunchPrice: MealPrice,
    dinnerPrice: MealPrice,
    dishes: VenueDish[],
    notes: string,
}