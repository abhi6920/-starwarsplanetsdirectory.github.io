import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlanets(`https://swapi.dev/api/planets/?format=json&page=${page}`);
  }, [page]);

  const fetchPlanets = (url) => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch planets');
        }
        return response.json();
      })
      .then((data) => {
        setPlanets(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleResidentClick = async (resident) => {
    // Code to handle resident click
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="App">
      <h1>Star Wars Planets Directory</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="planets">
        {planets.map((planet, index) => (
          <div key={index} className="planet-card">
            <h2>{planet.name}</h2>
            <p>Climate: {planet.climate}</p>
            <p>Population: {planet.population}</p>
            <p>Terrain: {planet.terrain}</p>
            {planet.residents.length > 0 && (
              <div>
                <h3>Residents:</h3>
                <ul>
                  {planet.residents.slice(0, 3).map((resident, index) => (
                    <li key={index} onClick={() => handleResidentClick(resident)}>
                      Resident {index + 1}
                    </li>
                  ))}
                  {planet.residents.length > 3 && (
                    <li onClick={() => handleResidentClick(planet.residents)}>
                      View all {planet.residents.length} residents
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        {page > 1 && <button onClick={() => handlePagination(page - 1)}>Previous</button>}
        {page < 9 && <button onClick={() => handlePagination(page + 1)}>Next</button>}
      </div>
    </div>
  );
}

export default App;