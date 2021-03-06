import { connect } from 'react-redux';

import { deleteItem, toggleItem, editItem, fillProfile } from '../actions';
import { getFilteredStoredItems } from '../reducers';
import List from '../components/List';

function mapStateToProps(state) {
    return {
        storedItems: getFilteredStoredItems(state),
        fetching: state.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onDelete: id => dispatch(deleteItem(id)),
        onToggle: id => dispatch(toggleItem(id)),
        onEdit: (id, title, location, comment, photo) => dispatch(editItem(id, title, location, comment, photo)),
        onFillProfile: id => dispatch(fillProfile(id))
    };
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListContainer;
