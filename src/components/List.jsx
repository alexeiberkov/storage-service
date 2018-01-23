import React from 'react';
import PropTypes from 'prop-types';

import StoredItem from './StoredItem';

export default function List(props) {
    return (
        <section className="stored-item-list">
            {!props.fetching && props.storedItems.length ?
                props.storedItems.map(item =>
                    <StoredItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        location={item.location}
                        comment={item.comment}
                        photo={item.photo}
                        known={item.known}
                        onDelete={props.onDelete}
                        onToggle={props.onToggle}
                        onEdit={props.onEdit}
                        onPhotoUpload={props.onPhotoUpload}
                    />)
                : props.fetching ? (<div className="progress"><div>Loading…</div></div>) : (<div className="message">There are no items</div>)
            }
        </section>
    );
}

List.propTypes = {
    storedItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        known: PropTypes.bool.isRequired
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onPhotoUpload: PropTypes.func.isRequired
};
