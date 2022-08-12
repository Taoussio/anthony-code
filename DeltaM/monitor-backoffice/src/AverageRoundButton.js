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
            result_values: null,
            result_values2: null,
            result_begin: null,
            sports: [],
            sport: null,
            countries: [],
            country: null,
            leagues: [],
            league: null,
            // categories: [],
            // category: null,
            max: null,
            min: null
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

    // apiCategory(sport, country, league) {
    //     fetch(`${API_URL}/match/category?&sport=${sport}&country=${country}&league=${league}`, {}).then(res => res.json()).then(res => {
    //         this.setState({
    //             categories: [
    //                 ...res.data.map(elem => elem.value).filter(elem => !!elem),
    //             ]
    //         })
    //     })
    // }

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
        // fetch(`${API_URL}/count/round/total?sport=${this.state.sport}&country=${this.state.country}&league=${this.state.league}&category=${this.state.category}${this.state.max !== null && this.state.max !== "" ? `&max=${this.state.max}` : ''}${this.state.min !== null && this.state.min !== "" ? `&min=${this.state.min}` : ''}`, {}).then(res => res.json()).then(res => {
        fetch(`${API_URL}/count/round/total?sport=${this.state.sport}&country=${this.state.country}&league=${this.state.league}${this.state.max !== null && this.state.max !== "" ? `&max=${this.state.max}` : ''}${this.state.min !== null && this.state.min !== "" ? `&min=${this.state.min}` : ''}`, {}).then(res => res.json()).then(res => {
            this.setState({
                result: `${Math.floor(res.rounds.reduce((acc, v) => acc + 100 * v.matchs.length / v.total, 0) / res.rounds.length)}%`,
                result_values: res.rounds.map(elem => {
                    return `${elem.round} - ${Math.floor(100 * elem.matchs.length / elem.total)}% (${elem.matchs.length} / ${elem.total})`
                }),
                result_values2: res.categories.map(elem => {
                    return `${elem.category} - ${Math.floor(100 * elem.matchs.length / elem.total)}% (${elem.matchs.length} / ${elem.total})`
                }),
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
                <FlatButton primary label="Round Average" onClick={this.handleOpen} icon={<ViewIcon />} />
                <Dialog
                    title="Round Average"
                    actions={this.state.sport && this.state.country && this.state.league /*&& this.state.category*/ && (this.state.max || this.state.min) ? (
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
                                        // this.apiCategory(this.state.sport, this.state.country, value)
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value={null} key="null" primaryText="" />
                                    {(() => this.state.leagues.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                </SelectField>
                            </div>
                        )
                    }
                    {/* {
                        this.state.sport && this.state.country && this.state.league && (
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
                        )
                    } */}
                    {
                        this.state.sport && this.state.country && this.state.league /*&& this.state.category*/ && (
                            <div>
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
                                        value={this.state.result || ""}
                                        floatingLabelText="Average"
                                        onChange={(event, value) => { }}
                                    />
                                </div>
                                <div>
                                    <SelectField
                                        value={this.state.result_values ? this.state.result_values[0] : ""}
                                        floatingLabelText="Values by round"
                                        onChange={(event, index, value) => { }}
                                        autoWidth
                                        style={{ width: '75%' }}
                                    >
                                        {this.state.result_values && (() => this.state.result_values.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                    </SelectField>
                                </div>
                                <div>
                                    <SelectField
                                        value={this.state.result_values2 ? this.state.result_values2[0] : ""}
                                        floatingLabelText="Values by category"
                                        onChange={(event, index, value) => { }}
                                        autoWidth
                                        style={{ width: '75%' }}
                                    >
                                        {this.state.result_values2 && (() => this.state.result_values2.map(elem => <MenuItem value={elem} key={elem} primaryText={elem} />))()}
                                    </SelectField>
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
