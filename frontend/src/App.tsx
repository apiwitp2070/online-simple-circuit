import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './main';
import Docs from './documents';

const App = () => {
  return(
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path="/online-simple-circuit" component={Main} />
        <Route exact path="/documents" component={Docs} />
        <Redirect to="/online-simple-circuit" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;