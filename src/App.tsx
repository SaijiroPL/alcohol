import React from 'react';
import { BrowserRouter as Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Splash from 'pages/Splash';
import Page1 from 'pages/Question/Page1';
import Page2 from 'pages/Question/Page2';

function App() {
  return (
    <BrowserRouter>
      <div className='ac-container'>
        <Switch>
          <Route path="/" exact component={Splash} />
          <Route path="/question/1" component={Page1} />
          <Route path="/question/2" component={Page2} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
