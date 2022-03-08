import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

class Login extends Component {
  render() {
    const { handleInputLogin, onButtonClick, login, name, ableLogin, load } = this.props;
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
                  onChange={ handleInputLogin }
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ onButtonClick }
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

Login.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  ableLogin: PropTypes.bool.isRequired,
  handleInputLogin: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
};

export default Login;
