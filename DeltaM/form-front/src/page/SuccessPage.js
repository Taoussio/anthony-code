import React, { Component } from 'react';

class SuccessPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>Le formulaire vient d'être envoyé</h1>
        <p>
          Pour toute question, n'hésitez à nous contacter par email
        </p>
      </div>
    )
  }

}

export default SuccessPage;
