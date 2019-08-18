import React, { Component } from 'react';

import { axiosInstance } from '../../../config/api';
import Card from '../../components/Card';
import Loader from '../../components/Loader';

import './style.css';

class Characters extends Component {
  state = { data: [], loading: true };

  componentDidMount() {
    axiosInstance.get('/characters')
      .then(response => this.setState({ data: response.data, loading: false }))
      .catch(error => console.log('Error', error))
  }

  render() {
    const { data, loading } = this.state;
    console.log(data);

    return (
      <>
        {loading ? <Loader /> : (
          <div className="character-container">
            {data.map(character => <Card key={character.id} data={character} />)}
          </div>
        )}
      </>
    );
  }
}

export default Characters;
