import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './main';

const App = () => {
  return(
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path="/main" component={Main} />
        <Redirect to="/main" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;