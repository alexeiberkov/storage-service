import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Modal from './Modal';

export default class StoredItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: this.props.photo
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onPhotoUpload = this.onPhotoUpload.bind(this);
    }

    componentDidMount() {
        this.refs.storedTitle.focus();
    }

    onSubmit(e) {
        e.preventDefault();

        const title = this.refs.storedTitle.value;
        const location = this.refs.storedLocation.value;
        const comment = this.refs.storedComment.value;
        const photo = this.state.photo;

        this.props.onSubmit(title, location, comment, photo);
    }

    onPhotoUpload(e) {
        e.preventDefault();

        let formData = new FormData(),
            imagefile = this.refs.storedPhoto.files[0];

        formData.append("image", imagefile);
        this.props.onPhotoUpload(formData);

        this.setState({photo: imagefile.name});
    }


    render() {
        const {title, location, comment, photo, onClose} = this.props;

        return (
            <Modal>
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
                        {photo !== '' ?
                            (<Fragment>
                                <img
                                    src={`./images/${this.state.photo}`}
                                    alt={title}
                                    onClick={() => {window.open(`./images/${this.state.photo}`)}}
                                    title="Click to enlarge"
                                />
                                <label className="label-file" htmlFor="inputFile">Change photo</label>
                                <input
                                    className="input-file"
                                    type="file"
                                    id="inputFile"
                                    ref="storedPhoto"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={this.onPhotoUpload}
                                />
                            </Fragment>) :
                            <Fragment>
                                <label className="label-file" htmlFor="inputFile">{this.state.photo !== '' ? this.state.photo : 'Choose an image…'}</label>
                                <input
                                    className="input-file"
                                    type="file"
                                    id="inputFile"
                                    ref="storedPhoto"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={this.onPhotoUpload}
                                />
                            </Fragment>
                        }
                        <div className="button-group">
                            <Button type="submit">Save</Button>
                            <Button onClick={onClose}>Close</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        );
    }
}

StoredItemForm.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onPhotoUpload: PropTypes.func.isRequired
};
