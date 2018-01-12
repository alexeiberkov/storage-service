import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Button from './Button';

class StoredItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.editing) {
            this.refs.title.focus();
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const title = this.refs.title.value;

        this.props.onEdit(this.props.id, title);
        this.setState({editing: false});
    }

    handleDelete() {
        let confirm = window.confirm('Are you sore?');
        if (confirm) {
            this.props.onDelete(this.props.id);
        }
    }

    handleToggle() {
        this.props.onToggle(this.props.id);
    }

    handleEdit() {
        this.setState({editing: true});
    }

    renderDisplay() {
        const className = `stored-item${this.props.known ? ' known' : ''}`;

        return (
            <div className={className}>
                <Checkbox checked={this.props.known} onChange={this.handleToggle} title={`Did you ${this.props.known ? 'lost' : 'found'} it?`}/>

                <span className="stored-item-title">{this.props.title}</span>

                <Button className="edit icon" icon="edit" onClick={this.handleEdit} title="Edit" />
                <Button className="delete icon" icon="delete" onClick={this.handleDelete} title="Delete" />
            </div>
        );
    }

    renderForm() {
        return (
            <form className="stored-item-edit-form" onSubmit={this.handleSubmit}>
                <input type="text" ref="title" defaultValue={this.props.title}/>
                <Button className="save icon" icon="save" type="submit"/>
            </form>
        );
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay();
    }
}

StoredItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    known: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default StoredItem;
