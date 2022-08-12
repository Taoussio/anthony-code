
import React from 'react'
import {
    Edit,
    LongTextInput,
    Responsive,
    List,
    Datagrid,
    TextField,
    UrlField,
    ImageField,
    FunctionField,
    Show,
    SimpleShowLayout,
    ShowButton,
    EditButton,
    Filter,
    SelectInput,
    TextInput,
    NumberInput,
    DisabledInput,
    SimpleForm,
    SelectArrayInput,
    RefreshButton,
    CreateButton,
    Create
} from 'admin-on-rest'
import Avatar from 'material-ui/Avatar'
import SimpleList from './MySimpleList'
import MultipleField from './MultipleField'
import ApiSelectInput from './ApiSelectInput'
import ApiAutocompleteInput from './ApiAutocompleteInput'
import { CardActions } from 'material-ui/Card';
import MaxButton from './MaxButton'
import DeleteAllButton from './DeleteAllButton'
import MaxRoundButton from './MaxRoundButton'
import MaxPenButton from './MaxPenButton'
import JsonField from './JsonField'
import NobutRoundButton from './NobutRoundButton'
import AverageRoundButton from './AverageRoundButton'
import CoteButton from './CoteButton'


const API_URL = process.env.REACT_APP_API_HOSTNAME

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right'
}

const Error_Actions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions style={cardActionStyle}>
        <Responsive
            small={
                <div>
                    {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' })}
                    {/* <CreateButton basePath={basePath} /> */}
                    <RefreshButton />
                </div>
            }
            medium={
                <div>
                    {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' })}
                    <RefreshButton />
                </div>
            }
        />
    </CardActions>
)

const Error_Filter = (props) => (
    <Filter {...props}>
    </Filter>
)

export const ErrorList = (props) => (
    <List {...props} filters={<Error_Filter />} actions={<Error_Actions />} >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `${record.name}`}
                />
            }
            medium={
                <Datagrid>
                    <JsonField source="message" sortable={false} />
                    <TextField source="count" sortable={false} />
                </Datagrid>
            }
        />
    </List>
)
