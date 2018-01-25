import axios from 'axios';

export const REQUEST_STORED_ITEMS = 'REQUEST_STORED_ITEMS';
export const GET_STORED_ITEMS = 'GET_STORED_ITEMS';
export const ADD_STORED_ITEMS = 'ADD_STORED_ITEMS';
export const ADD_STORED_ITEM_PHOTO = 'ADD_STORED_ITEM_PHOTO';
export const DELETE_STORED_ITEMS = 'DELETE_STORED_ITEMS';
export const TOGGLE_STORED_ITEMS = 'TOGGLE_STORED_ITEMS';
export const EDIT_STORED_ITEMS = 'EDIT_STORED_ITEMS';
export const FILL_PROFILE = 'FILL_PROFILE';
export const CLOSE_ITEM_PROFILE = 'CLOSE_ITEM_PROFILE';

export function getStored() {
    return dispatch => {
        dispatch({
            type: REQUEST_STORED_ITEMS
        });

        return axios.get('api/depot')
            .then(response => response.data)
            .then(storedItems => dispatch({
                type: GET_STORED_ITEMS,
                storedItems
            }));
    };
}

export function addItem(title) {
    return axios.post('api/depot', {title})
        .then(response => response.data)
        .then(item => ({
            type: ADD_STORED_ITEMS,
            item
        }));
}

export function addPhoto(photo, id) {
    return axios.post('images/upload', photo, {headers: {'Content-Type': photo.type}})
        .then(response => response.data)
        .then(item => ({
            type: ADD_STORED_ITEM_PHOTO,
            id,
            tmpPhoto: item.photo
        }));
}

export function deleteItem(id) {
    return axios.delete(`api/depot/${id}`)
        .then(response => ({
            type: DELETE_STORED_ITEMS,
            id
        }));
}

export function toggleItem(id) {
    return axios.patch(`api/depot/${id}`)
        .then(response => response.data)
        .then(item => ({
            type: TOGGLE_STORED_ITEMS,
            item
        }));
}

export function editItem(id, title, location = '', comment = '', photo = '') {
    return axios.put(`api/depot/${id}`, {title, location, comment, photo})
        .then(response => response.data)
        .then(item => ({
            type: EDIT_STORED_ITEMS,
            item
        }));
}

export function fillProfile(id) {
    return {
        type: FILL_PROFILE,
        id
    };
}

export function closeProfile() {
    return {
        type: CLOSE_ITEM_PROFILE
    };
}
