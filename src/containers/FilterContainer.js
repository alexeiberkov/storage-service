import { connect } from 'react-redux';

import { setFilter } from '../actions';
import Filter from '../components/Filter';

function mapStateToProps(state) {
    return {
        activeFilter: state.filter.filterType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSetFilter: (filter, value='') => dispatch(setFilter(filter, value))
    };
}

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterContainer;
