
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

const Bookmaker_Filter = (props) => (
    <Filter {...props}>
        <ApiSelectInput label="Name" source="name" api={`${API_URL}/bookmaker/names`} choices={Array.from([], v => ({ id: v, name: v }))} />
        <SelectInput label="Type" source="type" choices={Array.from(["OU", "BTS"], v => ({ id: v, name: v }))} />
        <TextInput label="Hash" source="hash" options={{ maxLength: 1024 }} />
        <TextInput label="Total" source="total" options={{ maxLength: 1024 }} />
    </Filter>
)

export const BookmakerList = (props) => (
    <List {...props} filters={<Bookmaker_Filter />} >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `${record.name}`}
                    secondaryText={record => `${record.hash}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" sortable={true} />
                    <TextField source="name" sortable={false} />
                    <TextField source="hash" sortable={false} />
                    <TextField source="type" sortable={false} />
                    <TextField source="total" sortable={false} />
                    <TextField source="over" sortable={false} />
                    <TextField source="under" sortable={false} />
                    <TextField source="YES" sortable={false} />
                    <TextField source="NO" sortable={false} />
                    <TextField source="updatedAt" sortable={true} />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

export const BookmakerShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="hash" />
            <TextField source="type" />
            <TextField source="total" />
            <TextField source="over" />
            <TextField source="under" />
            <TextField source="YES" />
            <TextField source="NO" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
)
