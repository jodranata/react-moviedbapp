import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line max-len
const greenTMDB = `https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg`;

export default function Searchbar(props) {
  const { handleChange, handleSubmit, resetSearchedListState, fontIcon, hideFontAwesome } = props;
  return (
    <div className="search-header">
      <img src={greenTMDB} alt="" className="tmdb-logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-bar">
          <input
            type="text"
            onChange={e => handleChange(e.target.value)}
            name="search"
            placeholder="Movie title.."
            autoComplete="off"
            className="search-input"
            /* when out of focus, the fetched initial data is cleared */
            onBlur={resetSearchedListState}
            /* when on focus, hide font awesome by turning fontIcon state to false */
            onFocus={hideFontAwesome}
          />
          {fontIcon && <FontAwesomeIcon icon={faSearch} className="search-icon" />}
        </div>
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetSearchedListState: PropTypes.func.isRequired,
  fontIcon: PropTypes.bool.isRequired,
  hideFontAwesome: PropTypes.func.isRequired,
};
