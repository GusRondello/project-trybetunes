import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      load: false,
      login: false,
      ableLogin: true,
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

  render() {
    const {
      login,
      name,
      ableLogin,
      load } = this.state;
    return (
      <>
        {load
          ? <Loading />
          : (
            <div data-testid="page-login">
              <p>Login</p>
              <form>
                <input
                  value={ name }
                  type="text"
                  data-testid="login-name-input"
                  onChange={ this.handleInputLogin }
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ this.onLoginBtnClick }
                  disabled={ ableLogin }
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
        {login && <Redirect to="/search" />}
      </>
    );
  }
}

export default Login;
