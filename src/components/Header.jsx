import React from 'react';
import PropTypes from 'prop-types';

import Stats from './Stats';

function Header(props) {
    return (
        <header>
            <Stats storedItems={props.storedItems} />
            <h1>Storage Service</h1>
        </header>
    );
}

Header.propTypes = {
    storedItems: PropTypes.array.isRequired
};

export default Header;
