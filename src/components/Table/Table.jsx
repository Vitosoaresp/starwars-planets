import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../../context/StarWarsContext';
import './Table.css';

function Table() {
  const { planets, data, setPlanets } = useContext(StarWarsContext);
  const MENOS_UM = -1;

  useEffect(() => {
    const initialSort = planets.sort((a, b) => {
      if (a.name < b.name) {
        return MENOS_UM;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setPlanets([...initialSort]);
  }, [data]);

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th>Name</th>
          <th>
            Rotation
            {' '}
            Period
          </th>
          <th>
            Orbital
            {' '}
            Period
          </th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>
            Surface
            {' '}
            Water
          </th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {planets && planets.map(({
          name,
          rotation_period: rotationPeriod,
          orbital_period: orbitalPeriod,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
        }) => (
          <tr key={ name }>
            <td data-testid="planet-name">{name}</td>
            <td>{rotationPeriod}</td>
            <td>{orbitalPeriod}</td>
            <td>{diameter}</td>
            <td>{climate}</td>
            <td>{gravity}</td>
            <td>{terrain}</td>
            <td>{surfaceWater}</td>
            <td>{population}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
