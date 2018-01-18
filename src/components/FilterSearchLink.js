import React from 'react';
import PropTypes from 'prop-types';

export default function FilterSearchLink(props) {
    return (
        <div className={`search-form${props.active ? ' is-active' : ''}`} title={props.title}>
                <input type="search" placeholder="Find item"/>
                <button onClick={props.onClick}><i className="material-icons">search</i></button>
        </div>
    );
}

FilterSearchLink.propTypes = {
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
