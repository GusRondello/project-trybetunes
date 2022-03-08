import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
        {loggedIn
          ? (
            <span data-testid="header-user-name">
              {`Olá ${user.name}`}
            </span>
          )
          : <Loading /> }
      </header>
    );
  }
}

export default Header;
