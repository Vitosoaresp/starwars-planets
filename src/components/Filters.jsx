import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const [columns, setColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  // const [comparisons, setComparisons] = useState([
  //   'maior que', 'menor que', 'igual a',
  // ]);

  const {
    filterByName,
    handleFilterByName,
    submitFilterByNumericValues,
    filterByNumericValues,
  } = useContext(StarWarsContext);

  useEffect(() => {
    const verifyColumns = () => {
      if (filterByNumericValues.length > 0) {
        setColumns(columns.filter((type) => type !== column));
      }
    };
    verifyColumns();
  }, [submitFilterByNumericValues]);

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
            value={ column }
            onChange={ (e) => setColumn(e.target.value) }
          >
            { columns.map((type) => (
              <option key={ type } value={ type }>{ type }</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            id="comparison"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
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
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
        </label>
        <div>
          <button
            type="button"
            onClick={ () => submitFilterByNumericValues({ column, comparison, value }) }
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
