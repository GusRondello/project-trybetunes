import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { musica, favoriteClick, favoriteList } = this.props;
    const { trackName, previewUrl, trackNumber, trackId } = musica;
    const favSongSaved = favoriteList.some((track) => track.trackId === musica.trackId);
    return (
      <div>
        <span>{`${trackNumber} - `}</span>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favSongSaved }
            onChange={ favoriteClick }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.objectOf(PropTypes.any).isRequired,
  favoriteClick: PropTypes.func.isRequired,
  favoriteList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
