import React from 'react';
import PropTypes from 'prop-types';

function stringifyData(dataArray) {
  if (dataArray) {
    const nestedData = dataArray.map(data => data.name);
    return nestedData.join(', ');
  }
}

let backdropURL;

function hourify(min) {
  if (min === undefined || min === null || min < 1) return 0;
  if (min <= 60) return `${min} mins`;
  const hour = Math.floor(min / 60);
  const restMinute = min - hour * 60;
  const hrPostFix = hour > 1 ? 'hrs' : 'hr';
  const minPostFix = restMinute > 1 ? 'mins' : 'min';
  return `${hour} ${hrPostFix} ${restMinute} ${minPostFix}`;
}

export default class Card extends React.Component {
  componentDidUpdate() {
    document.body.style.backgroundImage = `url(${backdropURL})`;
    console.log('updated');
  }

  render() {
    const { details } = this.props;
    const {
      title,
      genres,
      companies,
      releaseDate,
      runtime,
      overview,
      tagline,
      backdrop,
      poster,
      vote,
    } = details;

    const genresTag = stringifyData(genres);
    const companiesTag = stringifyData(companies);
    // eslint-disable-next-line max-len
    const noPoster = `http://placehold.jp/300/919191/ffffff/500x750.png?text=%3F&css=%7B%22border%22%3A%22%2014px%20solid%20rgba(0%2C0%2C0%2C0.2)%22%7D`;
    const posterURL = poster ? `https://image.tmdb.org/t/p/w500${poster}` : noPoster;
    backdropURL = `https://image.tmdb.org/t/p/original${backdrop}`;
    const voteTag = vote ? `${vote.toFixed(1)}` : `-`;
    const yearTag = releaseDate ? releaseDate.slice(0, 4) : `-`;

    return (
      <div className="card-section">
        <div className="card-poster-section">
          <img src={posterURL} alt="" />
        </div>
        <div className="card-details-section">
          <div className="title-detail">
            <h1>{title}</h1>
            {tagline && <p>{tagline}</p>}
          </div>
          <div className="vote-detail">
            <h2>{voteTag}</h2>
          </div>
          <div className="overview-detail">
            <p className="overview-text">{overview}</p>
            <div className="tag-details">
              {genresTag && (
                <div className="genres-tag">
                  <p>{genresTag}</p>
                </div>
              )}
              {companiesTag && (
                <div className="companies-tag">
                  <p>{companiesTag}</p>
                </div>
              )}
              {releaseDate && (
                <div className="opt-tag">
                  <p className="tag">Year:</p>
                  <p>{yearTag}</p>
                </div>
              )}
              {runtime && (
                <div className="opt-tag">
                  <p className="tag">Runtime:</p>
                  <p>{hourify(runtime)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    genres: PropTypes.array,
    companies: PropTypes.array,
    releaseDate: PropTypes.string,
    runtime: PropTypes.number,
    overview: PropTypes.string,
    tagline: PropTypes.string,
    backdrop: PropTypes.string,
    poster: PropTypes.string,
    vote: PropTypes.number,
  }).isRequired,
};
