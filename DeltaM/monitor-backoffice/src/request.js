
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
import NobutRoundButton from './NobutRoundButton'
import AverageRoundButton from './AverageRoundButton'
import CoteButton from './CoteButton'


const API_URL = process.env.REACT_APP_API_HOSTNAME

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right'
}

const Request_Actions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
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
                    <DeleteAllButton resource={resource} />
                    <RefreshButton />
                </div>
            }
        />
    </CardActions>
)

const Request_Filter = (props) => (
    <Filter {...props}>
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="method" />
        <TextInput source="result" />
        <TextInput source="project" />
        <TextInput source="date" />
    </Filter>
)

export const RequestList = (props) => (
    <List {...props} filters={<Request_Filter />} actions={<Request_Actions />} >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `${record.name}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="name" sortable={false} />
                    <TextField source="method" sortable={false} />
                    <TextField source="result" sortable={false} />
                    <TextField source="project" sortable={false} />
                    <TextField source="createdAt" sortable={false} />
                </Datagrid>
            }
        />
    </List>
)

export const RequestShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="method" />
            <TextField source="result" />
            <TextField source="project" />
            <TextField source="updatedAt" />
            <TextField source="createdAt" />
        </SimpleShowLayout>
    </Show>
)
