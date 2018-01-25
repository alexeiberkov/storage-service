import axios from 'axios';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const GET_LOCATIONS = 'GET_LOCATIONS';

export function getLocations() {
    return dispatch => {
        dispatch({
            type: REQUEST_LOCATIONS
        });

        return axios.get('api/locations')
            .then(response => response.data)
            .then(locationsList => dispatch({
                type: GET_LOCATIONS,
                locationsList
            }));
    };
}
