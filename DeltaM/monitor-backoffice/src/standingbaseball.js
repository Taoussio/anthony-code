
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

let selectedSport = null
let selectedCountry = null
let selectedLeague = null

const buildUrl = (baseUrl, query) => {
    let url = baseUrl
    let sep = '?'
    for (let key in query) {
        if (query[key]) {
            url += sep + key + '=' + query[key]
            sep = '&'
        }
    }
    return url
}

const Standingbaseball_Filter = (props) => (
    <Filter {...props}>
        <TextInput source="group" />
        <SelectInput label="Location" source="location" choices={Array.from(["home", "away"], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="Sport" source="sport" api={`${API_URL}/match/sport`} onSelected={(selection) => selectedSport = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="Country" source="country" api={buildUrl(`${API_URL}/match/country`, { sport: selectedSport })} onSelected={(selection) => selectedCountry = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="League" source="league" api={buildUrl(`${API_URL}/match/league`, { sport: selectedSport, country: selectedCountry })} onSelected={(selection) => selectedLeague = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
    </Filter>
)

export const StandingbaseballList = (props) => (
    <List {...props} filters={<Standingbaseball_Filter />} >
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
                    <TextField source="num" sortable={true} />
                    <TextField source="group" sortable={false} />
                    <TextField source="team" sortable={false} />
                    <ImageField source="image" sortable={false} />
                    <TextField source="mp" sortable={false} />
                    <TextField source="w" sortable={false} />
                    <TextField source="l" sortable={false} />
                    <TextField source="r" sortable={false} />
                    <TextField source="pct" sortable={false} />
                    <TextField source="form" sortable={false} />
                    <TextField source="updatedAt" sortable={true} />
                </Datagrid>
            }
        />
    </List>
)
