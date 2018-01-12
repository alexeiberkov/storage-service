import { connect } from 'react-redux';

import { addItem } from '../actions';
import Form from '../components/Form';

function mapDispatchToProps(dispatch) {
    return {
        onAdd: title => dispatch(addItem(title))
    };
}

const FormContainer = connect(null, mapDispatchToProps)(Form);

export default FormContainer;
