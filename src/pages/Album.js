import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      albumCover: '',
      musics: [],
      loading: false,
      favoriteList: [],
    };
  }

   componentDidMount = async () => {
     const { match } = this.props;
     const { id } = match.params;
     const albumInfo = await getMusics(id);
     const albumMusic = albumInfo.filter((_element, index) => index > 0);
     const getSongsInStorage = await getFavoriteSongs();
     this.setState({
       artistName: albumInfo[0].artistName,
       collectionName: albumInfo[0].collectionName,
       albumCover: albumInfo[0].artworkUrl100,
       musics: albumMusic,
       favoriteList: getSongsInStorage,
     });
   }

   handleFavoriteSongs = async ({ target }) => {
     const { id } = target;
     const { musics, favoriteList } = this.state;
     const idNumber = Number(id); // Luá me auxiliou a identificar que meu ID vinha do target como string e estava quebrando meu código por isso.
     const matchIdSong = musics.find((musica) => musica.trackId === idNumber);
     this.setState({
       loading: true,
     });
     if (favoriteList.some((musica) => musica.trackId === idNumber)) {
       await removeSong(matchIdSong);
     } else {
       await addSong(matchIdSong);
     }
     const getSongsInStorage = await getFavoriteSongs();
     this.setState({
       loading: false,
       favoriteList: getSongsInStorage,
     });
   }

   render() {
     const { artistName,
       collectionName,
       albumCover,
       musics,
       loading,
       favoriteList } = this.state;
     return (
       <div data-testid="page-album">
         <Header />
         <img src={ albumCover } alt={ collectionName } />
         <h1 data-testid="album-name">{collectionName}</h1>
         <h2 data-testid="artist-name">{artistName}</h2>
         <div>
           {loading ? <Loading />
             : musics.map((musica) => (
               <MusicCard
                 key={ musica.trackId }
                 musica={ musica }
                 favoriteClick={ this.handleFavoriteSongs }
                 loading={ loading }
                 favoriteList={ favoriteList }
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
