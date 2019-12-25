import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Searcbar from './components/Searchbar';
import Card from './components/Card';
import Suggestions from './components/Suggestions';
import './index.css';

const apiKey = `da2d7c1da5f30b2d200caef54d3a17d9`;
function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      searchedList: null,
      fontIcon: true,
    };
    this.handleChange = debounce(this.handleChange, 300);
  }

  //  fetch initial data
  fetchAPI = query => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    fetch(url)
      .then(blob => blob.json())
      .then(data => {
        console.log(data);
        const { results, errors } = data;
        const totalResult = data.total_results;
        let searchedList;
        if (totalResult >= 1 && !errors) {
          searchedList = results.map(result => {
            return {
              titles: result.title,
              ids: result.id,
              icons: result.poster_path,
              year: result.release_date,
            };
          });
        } else {
          searchedList = null;
        }
        this.setState({
          searchedList,
          isShown: true,
        });
      });
  };

  //  fetch initial data when typing >> data is debounce so it fetch data doesn't happen to often
  handleChange = input => {
    const value = this.tokenize(input);
    console.log(value);
    if (value.length >= 2) this.fetchAPI(value);
    else if (value.length < 1) {
      this.setState({
        searchedList: null,
        isShown: false,
      });
    }
  };

  tokenize = string => {
    return string
      .trim()
      .toLowerCase()
      .replace(/\s/gi, '%20');
  };

  /* fetch full data by ID generated from initial fetch}  */
  searchByID = async id => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    const fetchURL = await fetch(url);
    const movie = await fetchURL.json();
    this.setState({
      searchedList: null,
      details: {
        title: movie.title,
        genres: movie.genres,
        companies: movie.production_companies,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        overview: movie.overview,
        tagline: movie.tagline,
        backdrop: movie.backdrop_path,
        poster: movie.poster_path,
        vote: movie.vote_average,
      },
    });
  };
  //  search particular movie by id when clicked
  handleClick = input => {
    const id = input;
    console.log(id);
    this.searchByID(id);
  };

  // search when form is submitted/enter
  handleSubmit = e => {
    e.preventDefault();
    const { searchedList } = this.state;
    if (searchedList !== null) {
      const input = searchedList[0].ids;
      this.searchByID(input);
    }
  };

  resetSearchedListState = () => {
    this.setState({
      isShown: false,
    });
    setTimeout(() => {
      this.setState({
        searchedList: null,
        isShown: false,
        fontIcon: true,
      });
    }, 300);
  };

  hideFontAwesome = () => {
    this.setState({
      fontIcon: false,
    });
  };

  render() {
    const { searchedList, details, isShown, fontIcon } = this.state;
    const {
      handleChange,
      handleClick,
      handleSubmit,
      resetSearchedListState,
      hideFontAwesome,
    } = this;
    return (
      <div className="app-container">
        <div className="suggestions-list-section">
          <Searcbar
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            resetSearchedListState={resetSearchedListState}
            fontIcon={fontIcon}
            hideFontAwesome={hideFontAwesome}
          />
          {searchedList && (
            <CSSTransition
              in={isShown}
              timeout={300}
              classNames="suggestions-fade"
              mountOnEnter
              appear
              exit
            >
              <Suggestions searchedList={searchedList} handleClick={handleClick} />
            </CSSTransition>
          )}
        </div>
        {details && <Card details={details} />}
      </div>
    );
  }
}

export default App;
