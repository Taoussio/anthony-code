
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
import MaxRoundButton from './MaxRoundButton'
import MaxPenButton from './MaxPenButton'
import NobutRoundButton from './NobutRoundButton'
import AverageRoundButton from './AverageRoundButton'
import CoteButton from './CoteButton'


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

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right'
}

const Match_Actions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
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
                    {/* <CreateButton basePath={basePath} /> */}
                    <MaxButton resource={resource} />
                    <CoteButton resource={resource} />
                    <MaxRoundButton resource={resource} />
                    <MaxPenButton resource={resource} />
                    <NobutRoundButton resource={resource} />
                    <AverageRoundButton resource={resource} />
                    <RefreshButton />
                </div>
            }
        />
    </CardActions>
)

const Match_Filter = (props) => (
    <Filter {...props}>
        <TextInput label="Hash" source="hash" options={{ maxLength: 1024 }} />
        <TextInput label="Search" source="search" options={{ maxLength: 1024 }} />
        <ApiAutocompleteInput label="Team" source="team" api={`${API_URL}/match/teams`} too_many_choices />
        <SelectInput label="Past" source="past" choices={Array.from(['YES', 'NO'], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="Spe" source="spe" api={`${API_URL}/match/spe`} nullable={true} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="Sport" source="sport" api={`${API_URL}/match/sport`} onSelected={(selection) => selectedSport = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="Country" source="country" api={buildUrl(`${API_URL}/match/country`, { sport: selectedSport })} onSelected={(selection) => selectedCountry = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="League" source="league" api={buildUrl(`${API_URL}/match/league`, { sport: selectedSport, country: selectedCountry })} onSelected={(selection) => selectedLeague = selection} choices={Array.from([], v => ({ id: v, name: v }))} />
        <ApiSelectInput label="Category" source="category" api={buildUrl(`${API_URL}/match/category`, { sport: selectedSport, country: selectedCountry, league: selectedLeague })} choices={Array.from([], v => ({ id: v, name: v }))} />
        <TextInput label="Date" source="date" options={{ maxLength: 1024 }} />
    </Filter>
)

export const MatchList = (props) => (
    <List {...props} filters={<Match_Filter />} actions={<Match_Actions />} >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `${record.team1} - ${record.team2}`}
                    secondaryText={record => `${record.score1} - ${record.score2}`}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" sortable={true} />
                    <FunctionField label="Teams" render={record => `${record.team1} - ${record.team2}`} sortable={false} />
                    <FunctionField label="Scores" render={record => `${record.score1} - ${record.score2}`} sortable={false} />
                    <TextField source="spe" sortable={false} />
                    <TextField source="penalty" sortable={false} />
                    <TextField source="round" sortable={false} />
                    <TextField source="sport" sortable={false} />
                    <TextField source="country" sortable={false} />
                    <TextField source="league" sortable={false} />
                    <TextField source="category" sortable={false} />
                    <TextField source="date" sortable={true} />
                    <TextField source="hour" sortable={false} />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
)

export const MatchShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="hash" />
            <TextField source="team1" />
            <TextField source="team2" />
            <TextField source="score1" />
            <TextField source="score2" />
            <TextField source="penalty" />
            <TextField source="spe" />
            <TextField source="bet1" />
            <TextField source="betX" />
            <TextField source="bet2" />
            <TextField source="round" />
            <TextField source="sport" />
            <TextField source="country" />
            <TextField source="league" />
            <TextField source="category" />
            <TextField source="date" />
            <TextField source="exact_date" />
            <TextField source="updatedAt" />
            <TextField source="createdAt" />
            <UrlField source="bookmakers" />
        </SimpleShowLayout>
    </Show>
)
