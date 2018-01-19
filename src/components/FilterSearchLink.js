import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class FilterSearchLink extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.active && nextProps.active !== this.props.active) {
            this.refs.searchField.value = '';
        }
    }

    onClick(e) {
        e.preventDefault();

        const searchRequest = this.refs.searchField.value;

        if (searchRequest) {
            this.props.onClick(searchRequest);
        }
    }

    render() {
        return (
            <div className={`search-form${this.props.active ? ' is-active' : ''}`} title={this.props.title}>
                <input type="search" ref="searchField" placeholder="Find item" />
                <button onClick={this.onClick}><i className="material-icons">search</i></button>
            </div>
        );
    }
}

FilterSearchLink.propTypes = {
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
