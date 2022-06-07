import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async () => {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await request.json();
    return data;
  };

  useEffect(() => {
    fetchPlanets().then((data) => setPlanets(data));
  }, []);

  return (
    <StarWarsContext.Provider value={ { ...planets } }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StarWarProvider;
