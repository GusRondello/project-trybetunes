import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { artistAlbuns } = this.props;
    const { artworkUrl100, collectionName, collectionId } = artistAlbuns;
    return (
      <div>
        <NavLink
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
          id={ collectionId }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
        </NavLink>
        <h2>{collectionName}</h2>
      </div>

    );
  }
}

AlbumCard.propTypes = {
  artistAlbuns: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AlbumCard;
