import React from 'react';
import PropTypes from 'prop-types';

import { FILTER_ALL, FILTER_KNOWN_LOCATION, FILTER_WANTED, FILTER_SEARCH } from '../actions';
import FilterLink from './FilterLink';
import FilterSearchLink from './FilterSearchLink';

export default function Filter(props) {
    return (
        <div className="stored-item-filter">
            <FilterLink
                icon="storage"
                title="All items"
                active={props.activeFilter === FILTER_ALL}
                onClick={() => props.onSetFilter(FILTER_ALL)}>
            </FilterLink>

            <FilterLink
                icon="check_box"
                title="Known location"
                active={props.activeFilter === FILTER_KNOWN_LOCATION}
                onClick={() => props.onSetFilter(FILTER_KNOWN_LOCATION)}>
            </FilterLink>

            <FilterLink
                icon="check_box_outline_blank"
                title="Wanted"
                active={props.activeFilter === FILTER_WANTED}
                onClick={() => props.onSetFilter(FILTER_WANTED)}>
            </FilterLink>

            <FilterSearchLink
                icon="search"
                title="Find item"
                active={props.activeFilter === FILTER_SEARCH}
                onClick={req => props.onSetFilter(FILTER_SEARCH, req)}>
            </FilterSearchLink>
        </div>
    );
}

Filter.propTypes = {
    activeFilter: PropTypes.string.isRequired,
    onSetFilter: PropTypes.func.isRequired
};
