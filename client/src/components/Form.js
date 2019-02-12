import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchEngineActions from '../redux/actions/searchEngineActions';
import { Field, reduxForm } from 'redux-form';

const inputComponent = ({
    input,
    label,
    type,
    meta: { touched, error }
}) => (
    <div className="form-item">
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <div>{error}</div>}
        </div>
    </div>
)

const Form = (props) => {
    const submit = ({ query }) => {
        props.searchEngineActions.saveQuery(query)
        props.searchEngineActions.search(query)
    };
    
    const { handleSubmit, pristine, invalid, submitting } = props;

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Field
                component={inputComponent}
                label="Search person:"
                name="query"
                type="text"
                placeholder="Enter person details"
            />
            <button 
                disabled={invalid || pristine || submitting} 
                type="submit" 
            >
                Search
            </button>
        </form>
    )
}

const validate = values => ({
    query: !(values.query && values.query.length < 11) && "Query must be up to 10 characters long."
})
    
function mapStateToProps({ searchEngine }) {
    return {
        response: searchEngine.response,
        query: searchEngine.query,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchEngineActions: bindActionCreators(searchEngineActions, dispatch)
    };
}

const form = connect(mapStateToProps, mapDispatchToProps)(Form);

export default reduxForm({
    form: 'search',
    validate,
})(form);

