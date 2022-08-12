
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

const Pitcher_Filter = (props) => (
    <Filter {...props}>
        <TextInput source="player" />
    </Filter>
)

export const PitcherList = (props) => (
    <List {...props} filters={<Pitcher_Filter />} >
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
                    <TextField source="player" sortable={false} />
                    <TextField source="team" sortable={false} />
                    <TextField source="w" sortable={false} />
                    <TextField source="l" sortable={false} />
                    <TextField source="era" sortable={false} />
                    <TextField source="g" sortable={false} />
                    <TextField source="gs" sortable={false} />
                    <TextField source="cg" sortable={false} />
                    <TextField source="sho" sortable={false} />
                    <TextField source="sv" sortable={false} />
                    <TextField source="svo" sortable={false} />
                    <TextField source="ip" sortable={false} />
                    <TextField source="h" sortable={false} />
                    <TextField source="r" sortable={false} />
                    <TextField source="er" sortable={false} />
                    <TextField source="hr" sortable={false} />
                    <TextField source="hb" sortable={false} />
                    <TextField source="bb" sortable={false} />
                    <TextField source="so" sortable={false} />
                    <TextField source="whip" sortable={false} />
                    <TextField source="avg" sortable={false} />
                    <TextField source="updatedAt" sortable={false} />
                </Datagrid>
            }
        />
    </List>
)
