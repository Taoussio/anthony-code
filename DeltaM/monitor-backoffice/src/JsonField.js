import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';

const JsonField = ({ source, record = {}, elStyle }) => {
    let value = get(record, source)
    let json = null
    if (value.startsWith('Property values were not valid: ')) {
        try {
            json = JSON.parse(value.substring('Property values were not valid: '.length))[0]
            value = 'Property values were not valid: '
            delete json.isValid
            delete json.name
            if (json.error === 'INVALID_OPTION') {
                let indexAt = json.message.indexOf('was not one of the allowed options: ') + 'was not one of the allowed options: '.length
                console.log(json.message.substring(indexAt))
                let json2 = json.message.substring(indexAt).split('\n').filter(elem => elem.includes('value:')).map(elem => elem.split('value:').join('').trim())
                json.message = json.message.substring(0, indexAt) + json2.join(', ')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div>{value}</div>
            {
                json && (
                    <div>
                        <table>
                            {Object.keys(json).map(key => (
                                <tr>
                                    <td style={{ fontWeight: 'bolder' }}>
                                        {key}
                                    </td>
                                    <td>
                                        {json[key]}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                )
            }
        </div>
    )
}

JsonField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureJsonField = pure(JsonField);

PureJsonField.defaultProps = {
    addLabel: true,
};

export default PureJsonField;