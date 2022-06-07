import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { filterByName, handleFilterByName } = useContext(StarWarsContext);
  return (
    <nav>
      <label htmlFor="name-filter">
        <input
          id="name-filter"
          data-testid="name-filter"
          value={ filterByName.name }
          onChange={ (e) => handleFilterByName(e) }
        />
      </label>
    </nav>
  );
}

export default Filters;
