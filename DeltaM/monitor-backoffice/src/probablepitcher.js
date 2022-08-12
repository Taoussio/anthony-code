
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

const API_URL = process.env.REACT_APP_API_HOSTNAME

const Probablepitcher_Filter = (props) => (
    <Filter {...props}>
        <TextInput source="player" />
    </Filter>
)

export const ProbablepitcherList = (props) => (
    <List {...props} filters={<Probablepitcher_Filter />} >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `${record.team}`}
                    secondaryText={record => `${record.num}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" sortable={true} />
                    <TextField source="teams" sortable={false} />
                    <TextField source="date" sortable={false} />
                    <TextField source="pitcher1" sortable={false} />
                    <TextField source="pitcher2" sortable={false} />
                    <TextField source="updatedAt" sortable={false} />
                </Datagrid>
            }
        />
    </List>
)

