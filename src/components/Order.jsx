import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Order() {
  const [columnSort, setcolumnSort] = useState('population');
  const [sortType, setSortType] = useState('ASC');
  const { order, setOrder, planets, setPlanets } = useContext(StarWarsContext);

  useEffect(() => {
    const MENOS_UM = -1;
    const { sort, column } = order;
    if (sort === 'ASC') {
      const sortASC = planets.sort((a, b) => a[column] - b[column]);
      setPlanets([...sortASC]);
    } else {
      const sortDESC = planets.sort((a, b) => {
        if (a[column] === 'unknown') return 1;
        if (b[column] === 'unknown') return MENOS_UM;
        return b[column] - a[column];
      });
      setPlanets([...sortDESC]);
    }
  }, [order, setPlanets, setOrder]);

  return (
    <div>
      <div>
        <label htmlFor="order">
          Ordenar
          <select
            id="order"
            data-testid="column-sort"
            value={ columnSort }
            onChange={ (e) => setcolumnSort(e.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="asc">
          <input
            id="asc"
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ sortType === 'ASC' }
            onChange={ () => setSortType('ASC') }
          />
          Acendente
        </label>
        <label htmlFor="desc">
          <input
            id="desc"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ sortType === 'DESC' }
            onChange={ () => setSortType('DESC') }
          />
          Descendente
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setOrder({ column: columnSort, sort: sortType }) }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Order;
