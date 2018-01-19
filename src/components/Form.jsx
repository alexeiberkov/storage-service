import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const title = this.state.title;

        if (title) {
            this.props.onAdd(title);
            this.setState({ title: '' });
        }
    }

    handleChange(e) {
        const title = e.target.value;

        this.setState({ title });
    }

    render() {
        const disabled = !this.state.title;
        
        return (
            <form className="stored-item-add-form" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.title}
                    placeholder="Add an object to storage"
                    onChange={this.handleChange}
                />
                <Button type="submit" disabled={disabled}>Add</Button>
            </form>
        );
    }
}

Form.propTypes = {
    onAdd: PropTypes.func.isRequired
};
