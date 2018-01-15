import React from 'react';
import PropTypes from 'prop-types';

export default function Stats(props) {
    const total = props.storedItems.length;
    const known = props.storedItems.filter(item => item.known).length;
    const wanted = total - known;

    return (
        <table className="stats">
            <tbody>
                <tr>
                    <th>All items:</th>
                    <td>{total}</td>
                </tr>
                <tr>
                    <th>Known location:</th>
                    <td>{known}</td>
                </tr>
                <tr>
                    <th>Wanted:</th>
                    <td>{wanted}</td>
                </tr>
            </tbody>
        </table>
    );
}

Stats.propTypes = {
    storedItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        known: PropTypes.bool.isRequired
    })).isRequired
};
