import React          from 'react';
import logo           from './assets/logo.svg';
import { SearchFeed } from './pages/SearchFeed';
import './App.css';
import 'flexboxgrid'

const App: React.FC = () => {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo"/>
      <SearchFeed/>
    </div>
  );
};

export default App;
