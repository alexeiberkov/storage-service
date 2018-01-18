import React from 'react';
import PropTypes from 'prop-types';

export default function FilterSearchLink(props) {
    function renderLink() {
        return (
            <a onClick={props.onClick} title={props.title}>
                <i className="material-icons">{props.icon}</i>
            </a>
        );
    }

    function renderSearchField() {
        return (
            <div className="is-active">
                <input type="search" placeholder="Find item"/>
                <button type="submit"><i className="material-icons">search</i></button>
            </div>
        );
    }

    return (
        <div className="search-form">
            {props.active ? renderSearchField() : renderLink()}
        </div>
    );
}

FilterSearchLink.propTypes = {
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
