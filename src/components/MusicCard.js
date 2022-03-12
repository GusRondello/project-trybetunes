import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { musica } = this.props;
    const { trackName, previewUrl, trackNumber } = musica;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
