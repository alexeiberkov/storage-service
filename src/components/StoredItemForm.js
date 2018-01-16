import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Modal from './Modal';

export default class StoredItemForm extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.refs.storedTitle.focus();
    }

    onSubmit(event) {
        event.preventDefault();

        const title = this.refs.storedTitle.value;
        const location = this.refs.storedLocation.value;
        const comment = this.refs.storedComment.value;
        const photo = this.refs.storedPhoto.files.length ? this.refs.storedPhoto.files[0].name : '';

        this.props.onSubmit(title, location, comment, photo);
    }

    render() {
        return (
            <Modal>
                <div className="modal-wrapper">
                    <h1>Stored item profile</h1>
                    <form onSubmit={this.onSubmit}>
                        <label>Item name: <input type="text" ref="storedTitle" defaultValue={this.props.title}/></label>
                        <label>Item location: <input
                            ref="storedLocation"
                            type="text"
                            defaultValue={this.props.location}
                            placeholder="Add a place where it will be stored"
                        /></label>
                        <label>Comment: <textarea
                            ref="storedComment"
                            rows="4"
                            defaultValue={this.props.comment}
                            placeholder="Add a comment"
                        /></label>
                        <label>Item photo: <input type="file" defaultValue={this.props.photo} ref="storedPhoto" accept=".jpg, .jpeg, .png"/></label>
                        <div className="button-group">
                            <Button type="submit">Save</Button>
                            <Button onClick={this.props.onClose}>Close</Button>
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
};
