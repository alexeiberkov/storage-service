import React from 'react';
import PropTypes from 'prop-types';

import FilterLink from './FilterLink';

function Filter(props) {
    return (
        <div className="stored-item-filter">
            <FilterLink
                icon="list"
                title="All items"
                active={props.activeFilter === 'ALL'}
                onClick={() => props.onSetFilter('ALL')}>
            </FilterLink>

            <FilterLink
                icon="check_box"
                title="Known location"
                active={props.activeFilter === 'KNOWN_LOCATION'}
                onClick={() => props.onSetFilter('KNOWN_LOCATION')}>
            </FilterLink>

            <FilterLink
                icon="check_box_outline_blank"
                title="Wanted"
                active={props.activeFilter === 'WANTED'}
                onClick={() => props.onSetFilter('WANTED')}>
            </FilterLink>
        </div>
    );
}

Filter.propTypes = {
    activeFilter: PropTypes.string.isRequired,
    onSetFilter: PropTypes.func.isRequired
};

export default Filter;
