import {EventServiceModel} from './event-service'

export interface EventPhotoGalleryModel {
    title: string;
    location: string;
    imgUrls: string[];
    photographer: EventServiceModel;
    date: string;
}