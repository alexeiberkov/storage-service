import {
    GET_STORED_ITEMS,
    ADD_STORED_ITEMS,
    DELETE_STORED_ITEMS,
    EDIT_STORED_ITEMS,
    TOGGLE_STORED_ITEMS,
    FILTER_ALL,
    FILTER_KNOWN_LOCATION,
    FILTER_WANTED,
    FILTER_SEARCH,
    FILL_PROFILE,
    CLOSE_ITEM_PROFILE
} from '../actions';

function itemReducer(state = {}, action) {
    switch (action.type) {
        case TOGGLE_STORED_ITEMS:
            if (state.id !== action.item.id) {
                return state;
            }

            return action.item;

        case EDIT_STORED_ITEMS:
            if (state.id !== action.item.id) {
                return state;
            }

            return action.item;

        case FILL_PROFILE:
            if (state.id !== action.id) {
                return state;
            }

            return { ...state, editMode: true };

        case CLOSE_ITEM_PROFILE:
            if (!!state.editMode) {
                delete state.editMode;
            }

            return state;

        default:
            return state;
    }
}

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_STORED_ITEMS:
            return action.storedItems;

        case ADD_STORED_ITEMS:
            return [...state, action.item];

        case DELETE_STORED_ITEMS:
            const index = state.findIndex(item => item.id === action.id);

            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];

        case TOGGLE_STORED_ITEMS:
            return state.map(item => itemReducer(item, action));

        case EDIT_STORED_ITEMS:
            return state.map(item => itemReducer(item, action));

        case FILL_PROFILE:
            return state.map(item => itemReducer(item, action));

        case CLOSE_ITEM_PROFILE:
            return state.map(item => itemReducer(item, action));

        default:
            return state;
    }
}

export function getFilteredStoredItems(state, filter) {
    switch (filter.filterType) {
        case FILTER_ALL:
            return state;
        
        case FILTER_KNOWN_LOCATION:
            return state.filter(item => item.known);

        case FILTER_WANTED:
            return state.filter(item => !item.known);

        case FILTER_SEARCH:
            return state.filter(item => (item.title.toLowerCase()).indexOf(filter.value.toLowerCase()) > -1);

        default:
            return state;
    }
}
