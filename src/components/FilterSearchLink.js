import React from 'react';
import PropTypes from 'prop-types';

function FilterSearchLink(props) {
    return props.active ?
        (
            <div className="search-form is-active">
                <input type="search" placeholder="Find item"/>
                <button type="submit"><i className="material-icons">search</i></button>
            </div>
        ) :
        (
            <a onClick={props.onClick} title={props.title}>
                <i className="material-icons">{props.icon}</i>
            </a>
        );
}

FilterSearchLink.propTypes = {
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default FilterSearchLink;
