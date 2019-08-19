import React, { Component } from 'react';

import { axiosInstance } from '../../../config/api';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { saveData } from '../../../services/indexedDB';
import { showNotification } from '../../../services/notification';

import './style.css';

class Characters extends Component {
  state = { data: [], loading: true };

  componentDidMount() {
    if (navigator.onLine) {
      axiosInstance.get('/characters')
        .then(response => {
          saveData(response.data);
          this.setState({ data: response.data, loading: false });
          showNotification("This is site work offline. It's PWA :)");
        })
        .catch(error => console.log('Error', error))
    } else {
      // GET data from indexedDB
      showNotification("Connection not available but keep calm we're PWA");
    }
  }

  render() {
    const { data, loading } = this.state;

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
