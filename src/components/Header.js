import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {},
    };
  }

  componentDidMount= async () => {
    this.setState({
      loggedIn: true,
      user: await getUser(),
    });
  }

  render() {
    const { loggedIn, user } = this.state;
    return (
      <header data-testid="header-component">
        <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
        <div>
          {loggedIn
            ? (
              <span data-testid="header-user-name">
                {`Olá ${user.name}`}
              </span>
            )
            : <Loading /> }
        </div>
      </header>
    );
  }
}

export default Header;
