import React, { useContext, useEffect, useState } from 'react';
import { BsTrashFill, BsSearch } from 'react-icons/bs';
import StarWarsContext from '../../context/StarWarsContext';
import Order from '../Order/Order';
import './Filters.css';

function Filters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const COLUMNS = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(StarWarsContext);

  useEffect(() => {
    const verifyColumns = () => {
      if (filterByNumericValues.length > 0) {
        setColumnOptions(columnOptions.filter((type) => !filterByNumericValues
          .some(({ column: filterColumnValue }) => type === filterColumnValue)));
      } else {
        setColumnOptions(COLUMNS);
      }
    };
    verifyColumns();
  }, [filterByNumericValues, setFilterByNumericValues]);

  const removeFilter = (index) => {
    const currentFilters = [...filterByNumericValues];
    currentFilters.splice(index, 1);
    setFilterByNumericValues(currentFilters);
  };

  const formSubmit = (filterTypes) => {
    const { column: coluna, comparison: comparação, value: valor } = filterTypes;
    setFilterByNumericValues([...filterByNumericValues, {
      column: coluna,
      comparison: comparação,
      value: valor,
    }]);
    const index = columnOptions.indexOf(column) + 1;
    if (columnOptions.length > index) {
      setColumn(columnOptions[index]);
    }
  };

  return (
    <section className="fiters-container">
      <div className="filter-name-container">
        <label htmlFor="name-filter" className="filter-name">
          <BsSearch className="search-icon" />
          <input
            id="name-filter"
            data-testid="name-filter"
            value={ filterByName.name }
            onChange={ ({ target }) => setFilterByName({ name: target.value }) }
            placeholder="Busque por nome"
          />
        </label>
      </div>
      <div className="filter-options-container">
        <label htmlFor="column">
          Coluna
          <select
            id="column"
            data-testid="column-filter"
            value={ column }
            onChange={ ({ target }) => setColumn(target.value) }
          >
            { columnOptions.map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            id="comparison"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ ({ target }) => setComparison(target.value) }
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
            onChange={ ({ target }) => setValue(target.value) }
          />
        </label>
        <div className="filter-buttons-container">
          <button
            type="button"
            className="btn"
            onClick={ () => formSubmit({ column, comparison, value }) }
            data-testid="button-filter"
          >
            FILTRAR
          </button>
          <button
            className="btn"
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => setFilterByNumericValues([]) }
          >
            Remover Filtros
          </button>
        </div>
      </div>

      <Order />
      <section className="filters-values-container">
        { filterByNumericValues.map((filter, index) => (
          <div key={ filter.column } data-testid="filter">
            <span>{ filter.column }</span>
            <span>{ filter.comparison }</span>
            <span>{ filter.value }</span>
            <button
              type="button"
              className="btn-trash"
              onClick={ () => removeFilter(index) }
            >
              <BsTrashFill />
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}

export default Filters;
