import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const {
    filterByName,
    handleFilterByName,
    submitFilterByNumericValues,
  } = useContext(StarWarsContext);

  const handleFilterByNumericValues = ({ target }) => {
    const { id, value } = target;
    setFilterByNumericValues({ ...filterByNumericValues, [id]: value });
  };

  return (
    <nav>
      <div>
        <label htmlFor="name-filter">
          <input
            id="name-filter"
            data-testid="name-filter"
            value={ filterByName.name }
            onChange={ (e) => handleFilterByName(e) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="column">
          Coluna
          <select
            id="column"
            data-testid="column-filter"
            value={ filterByNumericValues.column }
            onChange={ (e) => handleFilterByNumericValues(e) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            id="comparison"
            data-testid="comparison-filter"
            value={ filterByNumericValues.comparison }
            onChange={ (e) => handleFilterByNumericValues(e) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            id="value"
            data-testid="value-filter"
            type="number"
            value={ filterByNumericValues.value }
            onChange={ (e) => handleFilterByNumericValues(e) }
          />
        </label>
        <div>
          <button
            type="button"
            onClick={ () => submitFilterByNumericValues(filterByNumericValues) }
            data-testid="button-filter"
          >
            FILTRAR
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Filters;
