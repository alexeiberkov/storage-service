import { REQUEST_STORED_ITEMS, GET_STORED_ITEMS } from '../actions';

function reducer(state = false, action) {
    switch (action.type) {
        case REQUEST_STORED_ITEMS:
            return true;

        case GET_STORED_ITEMS:
            return false;

        default:
            return state;
    }
}

export default reducer;
