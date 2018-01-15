import React from 'react';
import PropTypes from 'prop-types';

export default function FilterLink(props) {
    return (
        <a className={props.active ? 'is-active' : ''} onClick={props.onClick} title={props.title}>
            <i className="material-icons">{props.icon}</i>
        </a>
    );
}

FilterLink.propTypes = {
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
