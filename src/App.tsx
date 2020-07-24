import React from 'react';
import { BrowserRouter as Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Splash from 'pages/Splash';
import Question from 'pages/Question';

function App() {
  return (
    <BrowserRouter>
      <div className='ac-container'>
        <Switch>
          <Route path="/" exact component={Splash} />
          <Route path="/question" component={Question} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
