import { connect } from 'react-redux';

import { deleteItem, toggleItem, editItem, addPhoto } from '../actions';
import { getFilteredStoredItems } from '../reducers';
import StoredItemForm from '../components/StoredItemForm';

function mapStateToProps(state) {
    return {
        title: state.title,
        location: state.location,
        comment: state.comment,
        photo: state.photo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmit: () => {},
        onClose: () => {},
        onPhotoUpload: photo => dispatch(addPhoto(photo))
    };
}

const ProfileFormContainer = connect(mapStateToProps, mapDispatchToProps)(StoredItemForm);

export default ProfileFormContainer;
