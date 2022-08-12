
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'
import FlatButton from 'material-ui/FlatButton'
import { showNotification as showNotificationAction } from 'admin-on-rest'
import { push as pushAction } from 'react-router-redux'

import DeleteAllIcon from 'material-ui/svg-icons/action/delete'

import restClient from './restClient'

class DeleteAllButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            completed: 0,
            open1: false,
            open2: false,
            determinate: true
        }
        this.buffer = []
        this.currentSize = 0
        this.totalSize = 0
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    deleteBuffer(index = 0) {
        const { resource } = this.props
        const elem = this.buffer[index]
        restClient('DELETE', resource, { id: elem.id })
            .then((response) => {
                this.currentSize--
                this.setState({
                    completed: 100 * (this.totalSize - this.currentSize) / this.totalSize
                })
                if (index < this.buffer.length - 1) {
                    this.deleteBuffer(index + 1)
                } else {
                    this.buffer = []
                    this.downloadPage()
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }

    downloadPage(page = 1) {
        const perPage = 100
        const { resource, filterValues } = this.props
        restClient('GET_LIST', resource, { pagination: { page: page, perPage: perPage }, sort: {}, filter: filterValues })
            .then((response) => {
                if (this.totalSize === 0)
                    this.totalSize = response.total
                this.currentSize = response.total
                this.setState({
                    completed: 100 * (this.totalSize - this.currentSize) / this.totalSize
                })
                if ((page - 1) * perPage < response.total && (this.state.open1 || this.state.open2)) {
                    response.data.forEach(elem => this.buffer.push(elem))
                    this.deleteBuffer()
                } else {
                    this.totalSize = 0
                    this.setState({ open1: false, open2: false, determinate: true, completed: 0 })
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }

    handleOpen() {
        this.setState({ open1: true, open2: false, determinate: true, completed: 0 })
    }

    handleSubmit() {
        // this.setState({open1: false, open2: true, determinate : true, completed : 0})
        // this.downloadPage()
        this.setState({ open1: false, open2: false, determinate: true, completed: 0 })
        /** */
        const API_URL = process.env.REACT_APP_API_HOSTNAME;

        const url = `${API_URL}/requests`
        const requestHeaders = new Headers()
        requestHeaders.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        const options = { headers: requestHeaders }
        options.method = 'DELETE'
        options.body = JSON.stringify({})
        fetch(url, options).then(json => {
        })
    }

    handleClose() {
        this.setState({ open1: false, open2: false, determinate: true, completed: 0 })
    }

    onDrop = files => {
        this.setState({ files: files })
        console.log(files)
    }

    onRemove = file => () => {
        this.setState({ files: [] })
    }

    render() {
        const actions1 = [
            <FlatButton
                label="Yes"
                primary={true}
                onClick={this.handleSubmit}
            />,
            <FlatButton
                label="No"
                primary={true}
                onClick={this.handleClose}
            />
        ]
        const actions2 = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ]
        return (
            <div className="container-fluid" style={{ display: "inline" }}>
                <FlatButton secondary label="Delete All" onClick={this.handleOpen} icon={<DeleteAllIcon />} />
                <Dialog
                    title="Are you sure to delete all ?"
                    actions={actions1}
                    modal={false}
                    open={this.state.open1}
                    onRequestClose={this.handleClose}
                >
                </Dialog>
                <Dialog
                    title="Delete All"
                    actions={actions2}
                    modal={false}
                    open={this.state.open2}
                    onRequestClose={this.handleClose}
                >
                    <LinearProgress mode={this.state.determinate ? "determinate" : "indeterminate"} value={this.state.completed} />
                </Dialog>
            </div>
        )
    }
}

DeleteAllButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
}

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction,
})(DeleteAllButton)