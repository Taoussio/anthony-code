
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

const Ranking_Filter = (props) => (
    <Filter {...props}>
        <TextInput source="region" />
        <ApiSelectInput label="Sport" source="sport" api={`${API_URL}/match/sport`} onSelected={(selection) => selectedSport = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="Country" source="country" api={buildUrl(`${API_URL}/match/country`, { sport: selectedSport })} onSelected={(selection) => selectedCountry = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="League" source="league" api={buildUrl(`${API_URL}/match/league`, { sport: selectedSport, country: selectedCountry })} onSelected={(selection) => selectedLeague = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
    </Filter>
)

export const RankingList = (props) => (
    <List {...props} filters={<Ranking_Filter />} >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `${record.team}`}
                    secondaryText={record => `${record.rank}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" sortable={true} />
                    <TextField source="rank" sortable={true} />
                    <TextField source="region" sortable={false} />
                    <ImageField source="flag" sortable={false} />
                    <ImageField source="image" sortable={false} />
                    <TextField source="team" sortable={false} />
                    <FunctionField label="Matchs" render={record => `${record.mp} / ${record.total}`} sortable={false} />
                    <TextField source="w" sortable={false} />
                    <TextField source="d" sortable={false} />
                    <TextField source="l" sortable={false} />
                    <TextField source="g" sortable={false} />
                    <TextField source="pts" sortable={false} />
                    <TextField source="form" sortable={false} />
                    <TextField source="updatedAt" sortable={true} />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

export const RankingShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="rank" />
            <TextField source="region" />
            <TextField source="team" />
            <TextField source="mp" />
            <TextField source="total" />
            <TextField source="w" />
            <TextField source="d" />
            <TextField source="l" />
            <TextField source="g" />
            <TextField source="pts" />
            <TextField source="r" />
            <TextField source="pct" />
            <TextField source="wo" />
            <TextField source="lo" />
            <TextField source="form" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
)
