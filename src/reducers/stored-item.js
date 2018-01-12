import { GET_STORED_ITEMS, ADD_STORED_ITEMS, DELETE_STORED_ITEMS, EDIT_STORED_ITEMS, TOGGLE_STORED_ITEMS } from '../actions';

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

        default:
            return state;
    }
}

export function getFilteredStoredItems(state, filter) {
    switch (filter) {
        case 'ALL':
            return state;
        
        case 'KNOWN_LOCATION':
            return state.filter(item => item.known);

        case 'WANTED':
            return state.filter(item => !item.known);

        default:
            return state;
    }
}