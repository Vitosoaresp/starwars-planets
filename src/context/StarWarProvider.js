import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const fetchPlanets = async () => {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await request.json();
    return result;
  };

  useEffect(() => {
    fetchPlanets().then((result) => setPlanets(result.results));
    fetchPlanets().then((json) => setData(json));
  }, []);

  const handleFilterByName = ({ target }) => {
    const { value } = target;
    setFilterByName({ name: value });
  };

  const submitFilterByNumericValues = (filters) => {
    const { column, comparison, value } = filters;
    setFilterByNumericValues([...filterByNumericValues, { column, comparison, value }]);
  };

  useEffect(() => {
    const { results } = data;
    if (results) {
      const filteredPlanets = results
        .filter(
          (planet) => planet.name.toLowerCase().includes(filterByName.name.toLowerCase()),
        );
      setPlanets(filterByNumericValues.reduce((acumulador, filter) => acumulador
        .filter((planet) => {
          switch (filter.comparison) {
          case 'maior que':
            return planet[filter.column] > Number(filter.value);
          case 'menor que':
            return planet[filter.column] < Number(filter.value);
          case 'igual a':
            return planet[filter.column] === filter.value;
          default:
            return true;
          }
        }), filteredPlanets));
    }
  }, [filterByName, filterByNumericValues]);

  return (
    <StarWarsContext.Provider
      value={ {
        planets,
        handleFilterByName,
        filterByName,
        data,
        submitFilterByNumericValues,
        filterByNumericValues,
        setFilterByNumericValues,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StarWarProvider;
