import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      albumCover: '',
      musics: [],
    };
  }

   componentDidMount = async () => {
     const { match } = this.props;
     const { id } = match.params;
     const albumInfo = await getMusics(id);
     const albumMusic = albumInfo.filter((_element, index) => index > 0);
     this.setState({
       artistName: albumInfo[0].artistName,
       collectionName: albumInfo[0].collectionName,
       albumCover: albumInfo[0].artworkUrl100,
       musics: albumMusic,
     });
   }

   render() {
     const { artistName, collectionName, albumCover, musics } = this.state;
     return (
       <div data-testid="page-album">
         <Header />
         <img src={ albumCover } alt={ collectionName } />
         <h1 data-testid="album-name">{collectionName}</h1>
         <h2 data-testid="artist-name">{artistName}</h2>
         <div>
           {musics.map((musica) => (
             <MusicCard
               key={ musica.trackId }
               musica={ musica }
             />
           ))}

         </div>
       </div>
     );
   }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
