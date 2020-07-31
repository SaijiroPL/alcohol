import React from 'react';
import { BrowserRouter as Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Splash from 'pages/Splash';
import Page1 from 'pages/Question/Page1';
import Page2 from 'pages/Question/Page2';
import Page3 from 'pages/Question/Page3';
import Page4 from 'pages/Question/Page4';
import Page5 from 'pages/Question/Page5';
import Page6 from 'pages/Question/Page6';
import Page7 from 'pages/Question/Page7';
import Page8 from 'pages/Question/Page8';
import Page9 from 'pages/Question/Page9';
import Page10 from 'pages/Question/Page10';
import Page11 from 'pages/Question/Page11';
import Page12 from 'pages/Question/Page12';

import RPage1 from 'pages/Report/Page1';
import RPage2 from 'pages/Report/Page2';
import RPage3 from 'pages/Report/Page3';
import RPage4 from 'pages/Report/Page4';
import RPage5 from 'pages/Report/Page5';
import RPage6 from 'pages/Report/Page6';
import RPage7 from 'pages/Report/Page7';

function App() {
  return (
    <BrowserRouter>
      <div className='ac-container'>
        <Switch>
          <Route path="/" exact component={Splash} />
          <Route path="/question/1" component={Page1} />
          <Route path="/question/2" component={Page2} />
          <Route path="/question/3" component={Page3} />
          <Route path="/question/4" component={Page4} />
          <Route path="/question/5" component={Page5} />
          <Route path="/question/6" component={Page6} />
          <Route path="/question/7" component={Page7} />
          <Route path="/question/8" component={Page8} />
          <Route path="/question/9" component={Page9} />
          <Route path="/question/10" component={Page10} />
          <Route path="/question/11" component={Page11} />
          <Route path="/question/12" component={Page12} />
          <Route path="/goal/1" component={RPage1} />
          <Route path="/goal/2" component={RPage2} />
          <Route path="/goal/3" component={RPage3} />
          <Route path="/goal/4" component={RPage4} />
          <Route path="/goal/5" component={RPage5} />
          <Route path="/goal/6" component={RPage6} />
          <Route path="/goal/7" component={RPage7} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
