import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldTitle } from 'admin-on-rest';
import ChipInput from 'material-ui-chip-input';

export class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values : Array.isArray(this.props.input.value) ? this.props.input.value : []
        }
	}

    handleFocus = event => {
        this.props.onFocus(event);
        this.props.input.onFocus(event);
    };

    handleChange = eventOrValue => {
        this.props.onChange(eventOrValue);
        this.props.input.onChange(eventOrValue);
    };

    handleAdd = eventOrValue => {
        if (eventOrValue) {
            const values = this.state.values.concat([eventOrValue])
            this.setState({
                values : values
            }, () => this.handleChange(values))
        }
    };

    handleDelete = (eventOrValue, index) => {
        const values = this.state.values.filter((_, i) => i !== index)
        this.setState({
            values : values
        }, () => this.handleChange(values))       
    };

    render() {
        const {
            elStyle,
            input,
            isRequired,
            label,
            meta,
            options,
            resource,
            source,
            type
        } = this.props;
        if (typeof meta === 'undefined') {
            throw new Error(
                "The TextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/admin-on-rest/Inputs.html#writing-your-own-input-component for details."
            );
        }
        const { touched, error } = meta;

        return (

            <ChipInput
                allowDuplicates={true}
                value={this.state.values}
                type={type}
                onFocus={this.handleFocus}
                onClick={this.handleFocus}
                onRequestAdd={this.handleAdd}
                onRequestDelete={this.handleDelete}
                floatingLabelText={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    /> 
                }
                errorText={touched && error}
                style={elStyle}
                openOnFocus
                {...options}
            />
        );
    }
}

TextInput.propTypes = {
    addField: PropTypes.bool.isRequired,
    elStyle: PropTypes.object,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    type: PropTypes.string,
};

TextInput.defaultProps = {
    addField: true,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    options: {},
    type: 'text',
};

export default TextInput;