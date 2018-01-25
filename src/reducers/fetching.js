import { REQUEST_STORED_ITEMS, GET_STORED_ITEMS, REQUEST_LOCATIONS, GET_LOCATIONS } from '../actions';

function reducer(state = false, action) {
    switch (action.type) {
        case REQUEST_STORED_ITEMS:
            return true;

        case GET_STORED_ITEMS:
            return true;

        case REQUEST_LOCATIONS:
            return true;

        case GET_LOCATIONS:
            return false;

        default:
            return state;
    }
}

export default reducer;
