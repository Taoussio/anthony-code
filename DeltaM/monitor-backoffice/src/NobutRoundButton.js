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
            result: null,
            result_date: null,
            result_begin: null,
            sports: [],
            sport: null,
            countries: [],
            country: null,
            leagues: [],
            league: null,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFound = this.handleFound.bind(this);
    }

    apiSport() {
        fetch(`${API_URL}/match/sport`, {}).then(res => res.json()).then(res => {
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
        fetch(`${API_URL}/count/round/nobut?sport=${this.state.sport}&country=${this.state.country}&league=${this.state.league}`, {}).then(res => res.json()).then(res => {
            this.setState({
                result: res.series[0].length,
                result_date: res.series.map(serie => {
                    return `${this.formatDate(new Date(serie[0].date))} - ${this.formatDate(new Date(serie[serie.length - 1].date))}`
                }),
                result_numberOfTimes: res.series.length,
                result_begin : res.begin ? `${new Date(res.begin).getDate()}/${new Date(res.begin).getMonth() + 1}/${new Date(res.begin).getFullYear()}` : ""
            })
        })
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <div className="container-fluid" style={{ display: "inline" }}>
                <FlatButton primary label="No but Series" onClick={this.handleOpen} icon={<ViewIcon />} />
                <Dialog
                    title="No but Series"
                    actions={this.state.sport && this.state.country && this.state.league ? (
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
                                    <h4>Result</h4>
                                </div>
                                <div>
                                    <TextField
                                        value={this.state.result || ""}
                                        type="number"
                                        floatingLabelText="Result"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                                <div>
                                    <SelectField
                                        value={this.state.result_date ? this.state.result_date[0] : ""}
                                        floatingLabelText="Date"
                                        onChange={(event, index, value) => { }}
                                        autoWidth
                                        style={{ width: '75%' }}
                                    >
                                        {this.state.result_date && (() => this.state.result_date.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                    </SelectField>
                                </div>
                                <div>
                                    <TextField
                                        value={this.state.result_numberOfTimes || ""}
                                        type="number"
                                        floatingLabelText="Number Of Times"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        value={this.state.result_begin || ""}
                                        floatingLabelText="Begin"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                            </div>
                        )
                    }
                </Dialog>
            </div>
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
