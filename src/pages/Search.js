import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputArtist: '',
      ableSearch: true,
      artistAlbuns: [],
    };
  }

  handleInputSearch = ({ target }) => {
    const { value } = target;
    const minValue = 2;
    this.setState({
      inputArtist: value,
      ableSearch: value.length < minValue,
    });
  }

  handleSearchBtn = async (event) => {
    event.preventDefault();
    const { inputArtist } = this.state;
    this.setState({
      artistAlbuns: [],
      foudArtist: inputArtist,
    });
    const foundAlbuns = await searchAlbumsAPI(inputArtist);
    this.setState({
      inputArtist: '',
      artistAlbuns: foundAlbuns,
    });
  }

  // com a ajuda do Daniel consegui localizar meu erro no ternário
  render() {
    const { inputArtist,
      foudArtist,
      ableSearch,
      artistAlbuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <h1>Pesquisa: </h1>
          <input
            value={ inputArtist }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputSearch }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ ableSearch }
            onClick={ this.handleSearchBtn }
          >
            Procurar
          </button>
        </form>
        <div>
          {artistAlbuns.length > 0
            ? (
              <span>
                {`Resultado de álbuns de: ${foudArtist}`}
              </span>
            )
            : <span>Nenhum álbum foi encontrado</span>}
          {artistAlbuns.length > 0
          && artistAlbuns.map((artista) => (
            <AlbumCard
              key={ artista.artistId }
              artistAlbuns={ artista }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
