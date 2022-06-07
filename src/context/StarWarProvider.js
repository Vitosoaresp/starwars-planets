import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

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

  useEffect(() => {
    const { results } = data;
    if (results) {
      const filteredPlanets = results
        .filter(
          (planet) => planet.name.toLowerCase().includes(filterByName.name.toLowerCase()),
        );
      setPlanets(filteredPlanets);
    }
  }, [filterByName]);

  return (
    <StarWarsContext.Provider
      value={ {
        planets,
        handleFilterByName,
        filterByName,
        data,
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
