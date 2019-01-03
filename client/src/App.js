import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from "./components/Navbar";
import Lists from './components/Lists';
import List from './components/List';
import Items from './components/Items';
import Item from './components/Item';
import { Container } from "semantic-ui-react";


const App = () => (
  <Fragment>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/lists/:id" component={List} />
        <Route exact path="/lists/:id/items" component={Items} />
        <Route exact path="/lists/:id/items/:id" component={Item} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;
