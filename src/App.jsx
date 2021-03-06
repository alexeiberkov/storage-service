import React from 'react';

import HeaderContainer from './containers/HeaderContainer';
import FilterContainer from './containers/FilterContainer';
import ListContainer from './containers/ListContainer';
import FormContainer from './containers/FormContainer';
import ProfileContainer from './containers/ProfileContainer';

export default function App() {
    return (
        <main>
            <HeaderContainer />
            <FilterContainer />
            <ListContainer />
            <FormContainer />
            <ProfileContainer />
        </main>
    );
}
