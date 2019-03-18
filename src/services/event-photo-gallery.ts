import { post, get } from './base'
import { apiUrl } from '../config'
import {EventPhotoGalleryModel} from '../models/event-photo-gallery'

export interface CreateEventPhotoGalleryRequest {
    title: string;
    location: string;
    imgUrls: string[];
    photographerId: string;
    date: string;
    description: string;
}

export interface EventPhotoGalleryResponse {
    data: EventPhotoGalleryModel;
}

export interface EventPhotoGalleriesResponse {
    data: EventPhotoGalleryModel[];
}

export default {
    create(req: CreateEventPhotoGalleryRequest): Promise<EventPhotoGalleryResponse> {
        return post(`${apiUrl()}/event-photo-galleries`, req);
    },
    list(): Promise<EventPhotoGalleriesResponse> {
        return get(`${apiUrl()}/event-photo-galleries`);
    }
}