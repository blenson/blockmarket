import React, { Fragment } from "react";
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Fragment>
      <Navbar/>
      <div className="container">
        <div className="row">
          <Home/>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
