import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { FieldTitle } from 'admin-on-rest';
import AutoComplete from 'material-ui/AutoComplete';
import { stringify } from 'query-string';

export class TextInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choices: [
            ]
        }
    }

    api(q = '') {
        if (this.props.api) {
            fetch(`${this.props.api}${q ? `?q=${q}` : ''}`, {}).then(res => res.json()).then(res => {
                this.setState({ choices : [
                    ...(this.props.blank ? [''] : []),
                    ...res.data.map(elem => elem.value).filter(elem => !!elem),
                    ...(this.props.nullable ? ['NULL', 'NOT NULL'] : []),
                    ...(this.props.emptiable ? ['EMPTY', 'NOT EMPTY'] : [])
                ] })
            })
        }
    }

    componentDidMount() {
        this.api()
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
                <AutoComplete
                    options={this.state.choices}
                    dataSource={this.state.choices}
                    floatingLabelText={
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                    filter={(searchText, key) => key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1}
                    openOnFocus
                    style={elStyle}
                    errorText={touched && error}
                    {...options}
                    onNewRequest={(chosenRequest, index) => {
                        input.onChange(this.state.choices[index]);
                    }}
                    onUpdateInput={(searchText) => {
                        if (this.props.too_many_choices) {
                            this.api(searchText)
                        }
                    }}
                />
                {/* <TextField
                    {...input}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                    type={type}
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
                    {...options}
                />
                <AutoComplete
                    searchText={this.state.searchText}
                    dataSource={dataSource}
                    floatingLabelText={
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                    filter={filter}
                    onNewRequest={this.handleNewRequest}
                    onUpdateInput={this.handleUpdateInput}
                    openOnFocus
                    style={elStyle}
                    errorText={touched && error}
                    {...options}
                /> */}
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