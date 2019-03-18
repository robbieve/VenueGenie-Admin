import {EventServiceModel} from './event-service'

export interface EventPhotoGalleryModel {
    id: string;
    title: string;
    location: string;
    imgUrls: string[];
    photographer: EventServiceModel;
    date: string;
    description: string;
}