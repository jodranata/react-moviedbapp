import React from 'react';
import PropTypes from 'prop-types';

export default function Suggestions(props) {
  const { searchedList, handleClick } = props;
  const list = searchedList.map(movie => {
    const { titles, ids, icons } = movie;
    // eslint-disable-next-line max-len
    const noIcons = `http://placehold.jp/300/919191/ffffff/500x750.png?text=%3F&css=%7B%22border%22%3A%22%2014px%20solid%20rgba(0%2C0%2C0%2C0.2)%22%7D`;
    const iconURL = icons ? `https://image.tmdb.org/t/p/w500${icons}` : noIcons;
    const date = movie.year ? movie.year.slice(0, 4) : `-`;
    return (
      <li
        onClick={() => handleClick(ids)}
        onKeyDown={e => {
          if (e.keyCode === 13) handleClick(ids);
        }}
        role="option"
        key={ids}
        aria-selected="false"
        className="lists"
      >
        <img src={iconURL} alt="" className="list-icon" />
        <div className="list-detail">
          <p className="list-title">{titles}</p>
          <p className="list-year">{date}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="suggestions-header">
      <ul className="suggestions-list" role="listbox" aria-multiselectable="true">
        {list}
      </ul>
    </div>
  );
}

Suggestions.propTypes = {
  searchedList: PropTypes.arrayOf(
    PropTypes.shape({
      titles: PropTypes.string.isRequired,
      ids: PropTypes.number.isRequired,
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};
