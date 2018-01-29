import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Modal from './Modal';

export default class StoredItemProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: this.props.photo
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onPhotoUpload = this.onPhotoUpload.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tmpPhoto !== nextProps.tmpPhoto) {
            this.setState({photo: nextProps.tmpPhoto});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.editMode) {
            this.refs.storedTitle.focus();
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const params = [
            this.refs.storedTitle.value, // title
            this.refs.storedLocation.value, // location
            this.refs.storedComment.value, // comment
            this.state.photo // photo
        ];

        this.props.onEdit(this.props.id, ...params);
    }

    onPhotoUpload(e) {
        e.preventDefault();

        let formData = new FormData(),
            imagefile = this.refs.storedPhoto.files[0];

        formData.append("image", imagefile);
        this.props.onPhotoUpload(formData, this.props.id);
    }

    renderModal() {
        const {title, location, comment, onClose} = this.props;

        return (<Modal>
            <div className="modal-wrapper">
                <h1>Stored item profile</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Item name: <input type="text" ref="storedTitle" defaultValue={title}/></label>
                    <label>Item location: <input
                        ref="storedLocation"
                        type="text"
                        defaultValue={location}
                        placeholder="Add a place where it will be stored"
                    /></label>
                    <label>Comment: <textarea
                        ref="storedComment"
                        rows="4"
                        defaultValue={comment}
                        placeholder="Add a comment"
                    /></label>
                    {this.state.photo !== '' &&
                        <Fragment>
                            <img
                                src={`./images/${this.state.photo}`}
                                alt={title}
                                onClick={() => {
                                    window.open(`./images/${this.state.photo}`)
                                }}
                                title="Click to enlarge"
                            />
                        </Fragment>
                    }
                    <Fragment>
                        <label className="label-file" htmlFor="inputFile">{this.state.photo !== '' ? 'Change photo' : 'Choose an image…'}</label>
                        <input
                            className="input-file"
                            type="file"
                            id="inputFile"
                            ref="storedPhoto"
                            accept=".jpg, .jpeg, .png"
                            onChange={this.onPhotoUpload}
                        />
                    </Fragment>
                    <div className="button-group">
                        <Button type="submit">Save</Button>
                        <Button onClick={onClose}>Close</Button>
                    </div>
                </form>
            </div>
        </Modal>);
    }

    render() {
        return this.props.editMode && this.renderModal();
    }
}

StoredItemProfile.propTypes = {
    id: PropTypes.number.isRequired,
    editMode: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    tmpPhoto: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onPhotoUpload: PropTypes.func.isRequired
};
