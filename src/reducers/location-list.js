import { GET_LOCATIONS } from '../actions';

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_LOCATIONS:
            return action.locationsList;

        default:
            return state;
    }
}
