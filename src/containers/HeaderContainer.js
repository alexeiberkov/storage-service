import { connect } from 'react-redux';

import Header from '../components/Header';

function mapStateToProps(state) {
    return {
        storedItems: state.storedItems
    };
}

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;