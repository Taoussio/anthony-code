import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';
import Chip from 'material-ui/Chip';

const MultipleField = ({ source, record = {}, elStyle = { margin: 4 } }) => {

    const items = []
    let data = get(record, source)
    if (data) {
        if (!Array.isArray(data))
            data = [data]
        data.forEach((elem, index) => {
            items.push(
                <Chip key={'' + index} style={elStyle}>{elem}</Chip>
            )
        })
    }

    return (
        <div>
            {items}
        </div>
    )
};


MultipleField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
    record: PropTypes.object,
};

const PureMultipleField = pure(MultipleField);

PureMultipleField.defaultProps = {
    addLabel: true,
};

export default PureMultipleField;