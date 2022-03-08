import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { searchArtist, ableSearch, handleInputSearch } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <h1>Pesquisa: </h1>
          <input
            value={ searchArtist }
            type="text"
            data-testid="search-artist-input"
            onChange={ handleInputSearch }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ ableSearch }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  searchArtist: PropTypes.string.isRequired,
  ableSearch: PropTypes.bool.isRequired,
  handleInputSearch: PropTypes.func.isRequired,
};
