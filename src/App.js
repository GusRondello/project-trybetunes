import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      load: false,
      login: false,
      ableLogin: true,
      searchArtist: '',
      ableSearch: true,
    };
  }

  handleInputLogin = ({ target }) => {
    const { value } = target;
    const minName = 3;
    this.setState({
      name: value,
      ableLogin: value.length < minName,
    });
  } // Com ajuda da Vivi e do Vitu na mentoria consegui descobrir meu erro do async await e como utilizar para o Loading.js

  onLoginBtnClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ load: true });
    await createUser({ name });
    this.setState({
      load: false,
      login: true,
    });
  }

  handleInputSearch = ({ target }) => {
    const { value } = target;
    const minValue = 2;
    this.setState({
      searchArtist: value,
      ableSearch: value.length < minValue,
    });
  }

  render() {
    const { login,
      name,
      ableLogin,
      load,
      ableSearch,
      searchArtist } = this.state;
    return (
      <Switch>
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/album/:id" component={ Album } />
        <Route
          path="/search"
          render={ (props) => (
            <Search
              { ...props }
              ableSearch={ ableSearch }
              searchArtist={ searchArtist }
              handleInputSearch={ this.handleInputSearch }
            />
          ) }
        />
        <Route
          exact
          path="/"
          render={ (props) => (
            (
              <Login
                { ...props }
                load={ load }
                name={ name }
                login={ login }
                ableLogin={ ableLogin }
                onLoginBtnClick={ this.onLoginBtnClick }
                handleInputLogin={ this.handleInputLogin }
              />
            )) }
        />
        <Route exact path="/" />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
