import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class FilterSearchLink extends Component {
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.active && nextProps.active !== this.props.active) {
            this.refs.searchField.value = '';
        }
    }

    handleSearch(e) {
        e.preventDefault();

        const searchRequest = this.refs.searchField.value;

        if (searchRequest) {
            this.props.onClick(searchRequest);
        }
    }

    render() {
        const { title, active} = this.props;

        return (
            <div className={`search-form${active ? ' is-active' : ''}`} title={title}>
                <input type="search" ref="searchField" placeholder="Find item" />
                <button onClick={this.handleSearch}><i className="material-icons">search</i></button>
            </div>
        );
    }
}

FilterSearchLink.propTypes = {
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
