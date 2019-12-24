import React from 'react';
import logo  from './assets/logo.svg';
import './style/App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo"/>
        </div>
    );
};

export default App;
