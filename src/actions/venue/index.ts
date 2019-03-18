import {
  FETCH_VENUES,
  DELETE_VENUE,
  CREATE_VENUE,
} from '../../constants/actionTypes'

export const fetchOffers = () => ({
  type: FETCH_VENUES,
});

export const deleteOffer = (id: number) => ({
  type: DELETE_VENUE,
  id,
})

export const insertOffer = (offer: object) => ({
  type: CREATE_VENUE,
  offer,
})