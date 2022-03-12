import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/album/:id" component={ Album } />
        <Route path="/search" component={ Search } />
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route exact path="/" />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
