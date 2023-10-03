import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';
import './App.scss'

function App() {
  const [marvelCharacters, setMarvelCharacters] = useState([]);
  const [offset, setOffset] = useState(0);

  const publicKey = '';
  const privateKey = '';
  const apiBaseURL = 'https://gateway.marvel.com/v1/public';
  const limit = 20; // Number of results per request

  // Creates a URL for searching Marvel API for characters
  function createURL(offset) {
    const ts = Date.now();
    const params = new URLSearchParams({
      ts: ts,
      apikey: publicKey,
      hash: md5(ts + privateKey + publicKey),
      limit: limit,
      offset: offset,
    });
    const endpoint = `${apiBaseURL}/characters?`;
    const url = endpoint + params;
    return url;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(createURL(offset));
        const newCharacters = response.data.data.results;
        setMarvelCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [offset]);

  return (
    <div className='container'>
      <h1>Marvel App</h1>
      <ul>
        {marvelCharacters.map((character) => (
          <li className="list-item" key={character.id}>{character.name}</li>
        ))}
      </ul>
      <button className="secondaryButton" onClick={() => setOffset((prevOffset) => prevOffset + limit)}>Load More</button>
    </div>
  );
}

export default App;
