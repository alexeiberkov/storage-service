import { combineReducers } from 'redux';

import storedItems, * as fromStoredItems from './stored-item';
import filter from './filter';
import fetching from './fetching';

const reducer = combineReducers({
    storedItems,
    filter,
    fetching
});

export default reducer;

export function getFilteredStoredItems(state) {
    return fromStoredItems.getFilteredStoredItems(state.storedItems, state.filter);
}
