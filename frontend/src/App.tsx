import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './main';
import Docs from './documents';

const App = () => {
  return(
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/documents" component={Docs} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;