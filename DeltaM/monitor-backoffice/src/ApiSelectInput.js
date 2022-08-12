import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { FieldTitle } from 'admin-on-rest';

export class SelectInput extends Component {
    /*
     * Using state to bypass a redux-form comparison but which prevents re-rendering
     * @see https://github.com/erikras/redux-form/issues/2456
     */
    state = {
        value: this.props.input.value,
        choices : []
    };

    componentDidMount() {
        if (this.props.api) {
            fetch(this.props.api, {}).then(res => res.json()).then(res => {
                this.setState({ choices : [
                    ...(this.props.blank ? [''] : []),
                    ...res.data.map(elem => elem.value).filter(elem => !!elem),
                    ...(this.props.nullable ? ['NULL', 'NOT NULL'] : []),
                    ...(this.props.emptiable ? ['EMPTY', 'NOT EMPTY'] : [])
                ].map(elem => ({ id : elem, name : elem })) })
            })
        }
    }

    componentWillUnmount() {
        if (this.props.onSelected) {
            this.props.onSelected(null)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.input.value !== this.props.input.value) {
            this.setState({ value: nextProps.input.value });
        }
    }

    handleChange = (event, index, value) => {
        this.props.input.onChange(value);
        this.setState({ value });
        if (this.props.onSelected) {
            this.props.onSelected(value)
        }
    };

    addAllowEmpty = choices => {
        if (this.props.allowEmpty) {
            return [
                <MenuItem value={null} key="null" primaryText="" />,
                ...choices,
            ];
        }

        return choices;
    };

    renderMenuItem = choice => {
        const {
            optionText,
            optionValue,
            translate,
            translateChoice,
        } = this.props;
        const choiceName = React.isValidElement(optionText) // eslint-disable-line no-nested-ternary
            ? React.cloneElement(optionText, { record: choice })
            : typeof optionText === 'function'
              ? optionText(choice)
              : get(choice, optionText);
        return (
            <MenuItem
                key={get(choice, optionValue)}
                primaryText={choiceName}
                value={get(choice, optionValue)}
            />
        );
    };

    render() {
        const {
            elStyle,
            isRequired,
            label,
            meta,
            options,
            resource,
            source,
        } = this.props;
        const {
            choices
        } = this.state
        if (typeof meta === 'undefined') {
            throw new Error(
                "The SelectInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/admin-on-rest/Inputs.html#writing-your-own-input-component for details."
            );
        }
        const { touched, error } = meta;

        return (
            <SelectField
                value={this.state.value}
                floatingLabelText={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
                onChange={this.handleChange}
                autoWidth
                style={elStyle}
                errorText={touched && error}
                {...options}
            >
                {this.addAllowEmpty(choices.map(this.renderMenuItem))}
            </SelectField>
        );
    }
}

SelectInput.propTypes = {
    addField: PropTypes.bool.isRequired,
    allowEmpty: PropTypes.bool.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object),
    elStyle: PropTypes.object,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    translateChoice: PropTypes.bool.isRequired,
};

SelectInput.defaultProps = {
    addField: true,
    allowEmpty: false,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
};

export default SelectInput;