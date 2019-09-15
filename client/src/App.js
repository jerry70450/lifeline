import React, { Fragment } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Commands from './components/command/Commands';
import './App.css';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Commands />
    </Fragment>
  );
}

export default App;
