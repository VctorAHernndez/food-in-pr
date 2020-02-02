import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Filters from './components/Filters';
import RestaurantList from './components/RestaurantList';
import Footer from './components/Footer';
import HelpBar from './components/HelpBar';
import './App.css';

function App() {

  const [ restaurants, setRestaurants ] = useState([]);
  const [ isLoading, setLoading ] = useState(false);
  const [ isEnglish, setLanguage ] = useState(true);
  const [ firstSearch, setFirstSearch ] = useState(true);

  function updateRestaurants(filters) {

    if(filters.keyword || filters.category || filters.area || filters.environment) {

      setLoading(true);
  
      // One good thing would be to cache the json to speed up lookup time

      axios
        .get('/api/restaurants', { params: filters })
        .then(res => setRestaurants(res.data))
        .then(() => setLoading(false))
        .catch(err => {
          console.log(err);
          setLoading(false);
        });

    }
      
  }

  return (
    <div>
      <Header isEnglish={isEnglish} />
      <Filters 
        firstSearch={firstSearch}
        handleFirstSearch={() => setFirstSearch(false)}
        isEnglish={isEnglish}
        setRestaurants={filters => updateRestaurants(filters)}
      />
      <RestaurantList
        firstSearch={firstSearch}
        isEnglish={isEnglish}
        isLoading={isLoading}
        restaurants={restaurants}
      />
      <HelpBar
        isEnglish={isEnglish}
        changeLanguage={() => setLanguage(!isEnglish)}
      />
      <Footer isEnglish={isEnglish} />
    </div>
  );
}

export default App;
