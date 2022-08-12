import React, { Component } from 'react';

import Api from '../api/Api'

import Desktop from '../responsive/Desktop2'
import Mobile from '../responsive/Mobile2'

import { TextField, InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core'

import '../scss/common.scss';
import '../scss/home.scss';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {
    return (
      <div className="Home">
        <div className="header">
          <div className="helem"></div>
          <div className="helem"></div>
          <div className="helem"><img src='delta.png' /></div>
          <div className="helem"><h3>Formulaire</h3></div>
          <div className="helem"><img src='orange.jpg' /></div>
          <div className="helem"></div>
          <div className="helem"></div>
        </div>
        <div className="body">
        <div>
            <a href='/monoligne'>Monoligne</a>
          </div>
          <div>
            <a href='/multiligne'>Multiligne</a>
          </div>
          <div>
            <a href='/flottemobile'>Flotte Mobile</a>
          </div>
        </div>
      </div >
    )
  }
}

export default Home;
