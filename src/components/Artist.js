import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Artist extends Component {
  render() {
    const { artistAlbuns } = this.props;
    const { artworkUrl100, collectionName, collectionId } = artistAlbuns;
    return (
      <div>
        <NavLink
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
        </NavLink>
        <span>{collectionName}</span>
      </div>

    );
  }
}

Artist.propTypes = {
  artistAlbuns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Artist;
