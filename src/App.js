import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
// import Favourites from './Components/Favourites';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Banner />
      <List />
      {/* <Favourites /> */}
    </React.Fragment>
  );
}

export default App;