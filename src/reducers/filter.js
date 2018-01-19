import { SET_FILTER, FILTER_ALL } from '../actions';

export default function reducer(state = {filterType: FILTER_ALL}, action) {
    switch (action.type) {
        case SET_FILTER:
            return action.payload;

        default:
            return state;
    }
}
