import React, { Component } from 'react';

import { axiosInstance } from '../../../config/api';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { createDataBase, getHeroes } from '../../../services/indexedDB';
import { showNotification } from '../../../services/notification';

import './style.css';

class Characters extends Component {
  state = { data: [], loading: true };

  componentDidMount() {
    if (navigator.onLine) {
      this.getData();
    } else {
      this.getOfflineData();
      showNotification("Connection not available but keep calm we're PWA");
    }
  }

  getOfflineData = async () => {
    let data = await getHeroes();
    data = data.map(hero => {
      const photo = URL.createObjectURL(hero.photo);
      return { ...hero, photo };
    });
    this.setState({ data, loading: false });
  };

  getData = async () => {
    const response = await axiosInstance.get('/characters');
    try {
      createDataBase(response.data);
      this.setState({ data: response.data, loading: false });
      showNotification("This is site work offline. It's PWA :)");
    } catch (error) {
      this.setState({ loading: false });
      showNotification(`Oops error: ${error}`);
    }
  };

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
