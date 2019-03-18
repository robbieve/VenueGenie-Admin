import {
  FETCH_VENUES,
  DELETE_VENUE,
  CREATE_VENUE,
} from '../../constants/actionTypes'

export const fetchVenues = () => ({
  type: FETCH_VENUES,
});

export const deleteVenue = (id: number) => ({
  type: DELETE_VENUE,
  id,
})

export const insertVenue = (payload: object) => ({
  type: CREATE_VENUE,
  payload,
})