import {connect} from 'react-redux';

import {editItem, addPhoto, closeProfile} from '../actions';
import StoredItemProfile from '../components/StoredItemProfile';

function mapStateToProps(state) {
    const profileItem = (state.storedItems).find(item => !!item.editMode);

    return !!profileItem ?
        {
            id: profileItem.id,
            title: profileItem.title,
            location: profileItem.location,
            comment: profileItem.comment,
            photo: profileItem.photo,
            editMode: profileItem.editMode,
            tmpPhoto: profileItem.tmpPhoto
        } :
        {
            id: 0,
            title: '',
            location: '',
            comment: '',
            photo: '',
            editMode: false,
            tmpPhoto: ''
        };
}

function mapDispatchToProps(dispatch) {
    return {
        onEdit: (id, title, location, comment, photo) => dispatch(editItem(id, title, location, comment, photo)),
        onClose: () => dispatch(closeProfile()),
        onPhotoUpload: (photo, id) => dispatch(addPhoto(photo, id))
    };
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(StoredItemProfile);

export default ProfileContainer;
