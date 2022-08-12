import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

import ViewIcon from 'material-ui/svg-icons/image/remove-red-eye';

const API_URL = process.env.REACT_APP_API_HOSTNAME

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    entryDiv: {
        width: '40px',
        height: '40px',
        border: '1px solid  grey',
        backgroundColor: 'rgb(0, 188, 212)',
        margin: "4px",
        textAlign: 'center',
        color: 'white'
    },
    dbDiv: {
        width: '200px',
        height: '40px',
        border: '1px solid  grey',
        backgroundColor: 'rgb(0, 188, 212)',
        margin: "4px",
        textAlign: 'center',
        color: 'white'
    },
    buttonDiv: {
        height: '40px',
        margin: "4px"
    },
    entryText: {
        marginTop: '10px',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    dbNameText: {
        marginTop: '2px',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    countText: {
        marginTop: '2px',
        fontSize: '12px'
    },
};

class MaxButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open1: false,
            teams: [],
            team: null,
            result: null,
            result_date: null,
            result_begin: null,
            sports: [],
            sport: null,
            countries: [],
            country: null,
            leagues: [],
            league: null,
            categories: [],
            category: null,
            max: null,
            min: null
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFound = this.handleFound.bind(this);
    }

    apiSport() {
        fetch(`${API_URL}/match/sport`, {}).then(res => res.json()).then(res => {
            console.log(res)
            this.setState({
                sports: [
                    ...res.data.map(elem => elem.value).filter(elem => !!elem),
                ]
            })
        })
    }

    apiCountry(sport) {
        fetch(`${API_URL}/match/country?sport=${sport}`, {}).then(res => res.json()).then(res => {
            this.setState({
                countries: [
                    ...res.data.map(elem => elem.value).filter(elem => !!elem),
                ]
            })
        })
    }

    apiLeague(sport, country) {
        fetch(`${API_URL}/match/league?&sport=${sport}&country=${country}`, {}).then(res => res.json()).then(res => {
            this.setState({
                leagues: [
                    ...res.data.map(elem => elem.value).filter(elem => !!elem),
                ]
            })
        })
    }

    apiCategory(sport, country, league) {
        fetch(`${API_URL}/match/category?&sport=${sport}&country=${country}&league=${league}`, {}).then(res => res.json()).then(res => {
            this.setState({
                categories: [
                    ...res.data.map(elem => elem.value).filter(elem => !!elem),
                ]
            })
        })
    }

    apiTeam(sport, country, league, q) {
        fetch(`${API_URL}/match/teams?q=${q}&sport=${sport}&country=${country}&league=${league}`, {}).then(res => res.json()).then(res => {
            this.setState({
                teams: [
                    ...res.data.map(elem => elem.value).filter(elem => !!elem),
                ]
            })
        })
    }


    handleOpen() {
        this.setState({ open1: true });
        this.apiSport()
    }

    handleClose() {
        this.setState({ open1: false });
    }

    formatDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${(date.getHours() - 1 + 24) % 24}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    }

    handleFound() {
        fetch(`${API_URL}/count/cote?sport=${this.state.sport}&country=${this.state.country}&league=${this.state.league}${this.state.category !== null && this.state.category !== "" ? `&category=${this.state.category}` : ''}${this.state.team !== null && this.state.team !== "" ? `&team=${this.state.team}` : ''}${this.state.max !== null && this.state.max !== "" ? `&max=${this.state.max}` : ''}${this.state.min !== null && this.state.min !== "" ? `&min=${this.state.min}` : ''}`, {}).then(res => res.json()).then(res => {
            this.setState({
                per_home: `${Math.floor(100 * res.total_wins_home / res.total_matchs_home)}%`,
                per_away: `${Math.floor(100 * res.total_wins_away / res.total_matchs_away)}%`,
                result_date_home: res.series_home.map(serie => {
                    return `${this.formatDate(new Date(serie[0].date))} - ${this.formatDate(new Date(serie[serie.length - 1].date))} (${serie.length})`
                }),
                result_numberOfTimes_home: res.series_home.length,
                result_date_away: res.series_away.map(serie => {
                    return `${this.formatDate(new Date(serie[0].date))} - ${this.formatDate(new Date(serie[serie.length - 1].date))} (${serie.length})`
                }),
                result_numberOfTimes_away: res.series_away.length,
            })
        })
    }

    render() {
        console.log(this.state)
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <div className="container-fluid" style={{ display: "inline" }}>
                <FlatButton primary label="Cote Series" onClick={this.handleOpen} icon={<ViewIcon />} />
                <Dialog
                    title="Cote Series"
                    actions={this.state.sport && this.state.country && this.state.league && (this.state.max || this.state.min) ? (
                        [
                            <FlatButton
                                label="Found"
                                primary={true}
                                onClick={this.handleFound}
                            />,
                            ...actions
                        ]) : actions
                    }
                    modal={false}
                    open={this.state.open1}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent
                >
                    <div>
                        <SelectField
                            value={this.state.sport}
                            floatingLabelText={"Sport"}
                            onChange={(event, index, value) => {
                                this.setState({ sport: value })
                                this.apiCountry(value)
                            }}
                            autoWidth
                        >
                            <MenuItem value={null} key="null" primaryText="" />
                            {(() => this.state.sports.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                        </SelectField>
                    </div>
                    {
                        this.state.sport && (
                            <div>
                                <SelectField
                                    value={this.state.country}
                                    floatingLabelText={"Country"}
                                    onChange={(event, index, value) => {
                                        this.setState({ country: value })
                                        this.apiLeague(this.state.sport, value)
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value={null} key="null" primaryText="" />
                                    {(() => this.state.countries.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                </SelectField>
                            </div>
                        )
                    }
                    {
                        this.state.sport && this.state.country && (
                            <div>
                                <SelectField
                                    value={this.state.league}
                                    floatingLabelText={"League"}
                                    onChange={(event, index, value) => {
                                        this.setState({ league: value })
                                        this.apiCategory(this.state.sport, this.state.country, value)
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value={null} key="null" primaryText="" />
                                    {(() => this.state.leagues.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                </SelectField>
                            </div>
                        )
                    }
                    {
                        this.state.sport && this.state.country && this.state.league && (
                            <div>
                                <div>
                                    <SelectField
                                        value={this.state.category}
                                        floatingLabelText={"Category"}
                                        onChange={(event, index, value) => {
                                            this.setState({ category: value })
                                        }}
                                        autoWidth
                                    >
                                        <MenuItem value={null} key="null" primaryText="" />
                                        {(() => this.state.categories.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                    </SelectField>
                                </div>
                                <div>
                                    <AutoComplete
                                        options={this.state.teams}
                                        dataSource={this.state.teams}
                                        floatingLabelText={"Team"}
                                        filter={(searchText, key) => key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1}
                                        openOnFocus
                                        onNewRequest={(chosenRequest, index) => {
                                            this.setState({ team: this.state.teams[index] })
                                        }}
                                        onUpdateInput={(searchText, choices, event) => {
                                            if (event.source === 'change')
                                                this.apiTeam(this.state.sport, this.state.country, this.state.league, searchText)
                                        }}
                                    />
                                </div>
                                <div>
                                    <div>
                                        <TextField
                                            value={this.state.max}
                                            type="number"
                                            floatingLabelText="Max"
                                            onChange={(event, value) => {
                                                this.setState({ max: value })
                                            }}
                                        />
                                        <TextField
                                            value={this.state.min}
                                            type="number"
                                            floatingLabelText="Min"
                                            onChange={(event, value) => {
                                                this.setState({ min: value })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4>Result</h4>
                                </div>
                                <div>
                                    <TextField
                                        value={this.state.per_home || ""}
                                        floatingLabelText="Home"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                                <div>
                                    <SelectField
                                        value={this.state.result_date_home ? this.state.result_date_home[0] : ""}
                                        floatingLabelText="Home, Date"
                                        onChange={(event, index, value) => { }}
                                        autoWidth
                                        style={{ width: '75%' }}
                                    >
                                        {this.state.result_date_home && (() => this.state.result_date_home.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                    </SelectField>
                                </div>
                                <div>
                                    <TextField
                                        value={this.state.result_numberOfTimes_home || ""}
                                        type="number"
                                        floatingLabelText="Home, Number Of Times"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        value={this.state.per_away || ""}
                                        floatingLabelText="Away"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                                <div>
                                    <SelectField
                                        value={this.state.result_date_away ? this.state.result_date_away[0] : ""}
                                        floatingLabelText="Away, Date"
                                        onChange={(event, index, value) => { }}
                                        autoWidth
                                        style={{ width: '75%' }}
                                    >
                                        {this.state.result_date_away && (() => this.state.result_date_away.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                    </SelectField>
                                </div>
                                <div>
                                    <TextField
                                        value={this.state.result_numberOfTimes_away || ""}
                                        type="number"
                                        floatingLabelText="Away, Number Of Times"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                            </div>
                        )
                    }
                </Dialog>
            </div >
        )
    }
}

MaxButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction,
})(MaxButton);
