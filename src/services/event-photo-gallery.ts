import { post } from './base'
import { apiUrl } from '../config'
import {EventPhotoGalleryModel} from '../models/event-photo-gallery'

export interface CreateEventPhotoGalleryRequest {
    title: string;
    location: string;
    imgUrls: string[];
    photographer: string;
    date: string;
}

export interface EventPhotoGalleryResponse {
    data: EventPhotoGalleryModel;
}

export default {
    create(req: CreateEventPhotoGalleryRequest): Promise<EventPhotoGalleryResponse> {
        return post(`${apiUrl()}/photo-galleires`, req);
    }
}