import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './main';

const App = () => {
  return(
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;