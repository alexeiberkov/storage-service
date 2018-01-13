export const SET_FILTER = 'SET_FILTER';
export const FILTER_ALL = 'FILTER_ALL';
export const FILTER_KNOWN_LOCATION = 'FILTER_KNOWN_LOCATION';
export const FILTER_WANTED = 'FILTER_WANTED';
export const FILTER_SEARCH = 'FILTER_SEARCH';

export function setFilter(filter) {
    return {
        type: SET_FILTER,
        filter
    };
}