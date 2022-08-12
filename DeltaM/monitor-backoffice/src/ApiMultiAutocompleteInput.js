import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { FieldTitle } from 'admin-on-rest';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import { stringify } from 'query-string';
import ChipInput from 'material-ui-chip-input';

export class TextInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: Array.isArray(this.props.input.value) ? this.props.input.value : [],
            choices: []
        }
    }

    componentDidMount() {
        if (this.props.api) {
            fetch(this.props.api, {}).then(res => res.json()).then(res => {
                this.setState({
                    choices: [
                        ...(this.props.blank ? [''] : []),
                        ...res.data.map(elem => elem.value).filter(elem => !!elem),
                        ...(this.props.nullable ? ['NULL', 'NOT NULL'] : []),
                        ...(this.props.emptiable ? ['EMPTY', 'NOT EMPTY'] : [])
                    ]
                })
            })
        }
    }

    handleBlur = eventOrValue => {
        this.props.onBlur(eventOrValue);
        this.props.input.onBlur(eventOrValue);
    };

    handleFocus = event => {
        this.props.onFocus(event);
        this.props.input.onFocus(event);
    };

    handleChange = eventOrValue => {
        this.props.onChange(eventOrValue);
        this.props.input.onChange(eventOrValue);
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
            filter,
            meta,
            options,
            resource,
            source,
            type,
        } = this.props;
        if (typeof meta === 'undefined') {
            throw new Error(
                "The TextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/admin-on-rest/Inputs.html#writing-your-own-input-component for details."
            );
        }
        const { touched, error } = meta;

        // const dataSource = this.addAllowEmpty(
        //     choices.map(choice => ({
        //         value: get(choice, optionValue),
        //         text: this.getSuggestion(choice),
        //     }))
        // );


        return (
            <div>
                <div>
                    <AutoComplete
                        options={this.state.choices}
                        dataSource={this.state.choices}
                        filter={filter}
                        openOnFocus
                        style={elStyle}
                        errorText={touched && error}
                        {...options}
                        onNewRequest={(chosenRequest, index) => {
                            if (!this.state.values.includes(this.state.choices[index])) {
                                this.state.values.push(this.state.choices[index])
                                this.setState({ values: this.state.values }, () => this.handleChange(this.state.values))    
                            }
                        }}
                        onUpdateInput={(searchText) => {
                        }}
                        floatingLabelText={
                            <FieldTitle
                                label={label}
                                source={source}
                                resource={resource}
                                isRequired={isRequired}
                            />
                        }
                    />
                </div>
                <div>
                    <ChipInput
                        value={this.state.values}
                        type={type}
                        onFocus={this.handleFocus}
                        onClick={this.handleFocus}
                        // onRequestAdd={this.handleAdd}
                        onRequestDelete={this.handleDelete}
                        onUpdateInput={() => {
                            alert('Write above this line')
                        }}
                        errorText={touched && error}
                        style={elStyle}
                        openOnFocus
                        {...options}
                    />
                </div>
            </div>
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
    onBlur: () => { },
    onChange: () => { },
    onFocus: () => { },
    options: {},
    type: 'text',
};

export default TextInput;