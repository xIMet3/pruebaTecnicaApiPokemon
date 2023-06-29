import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import getPokemonDetails from '../../Services/apiCalls';
import './Home.css';

function Home() {
  // Estado para almacenar los Pokemon
  const [pokemons, setPokemons] = useState([]); 
  // Estado para controlar la ampliacion del Pokemon
  const [ampliacionPokemon, setAmpliacionPokemon] = useState(null); 

  useEffect(() => {
    // El efecto se ejecuta al montar el componente (solo una vez)

    // Llamada a la funcion para obtener los detalles del Pokemon
    getPokemonDetails() // Llamada a la función para obtener los detalles del Pokémon
      .then(res => {
        // Guardamos los detalles del Pokemon en el estado de los Pokemon
        setPokemons([res.data]); 
      })
      .catch(error => {
         // Muestra un mensaje de error si ocurre algun problema con la llamada a la API
        console.error('Error al cargar el Pokémon:', error);
      });
  }, []);
  // Funcion para ampliar la informacion adicional del Pokemon al hacer clic en una tarjeta
  const ampliarPokemon = (pokemon) => {

    // Si ya se ha ampliado la card del Pokemon y se hace clic nuevamente y cierra la ampliacion
    if (ampliacionPokemon === pokemon) {
      setAmpliacionPokemon(null);
    } else {
      // Si la card del Pokemon no esta ampliada lo amplia y muestra la informacion adicional
      setAmpliacionPokemon(pokemon); 
    }
  };

  return (
    <div>
      <h1>Vista Pokémons</h1>
      {pokemons.map(pokemon => (
        // Itera sobre la lista de Pokemon y crea una tarjeta para cada uno
        <Card
          className={`pikachuCard ${ampliacionPokemon === pokemon ? 'ampliacion' : ''}`}
          key={pokemon.id}
          onClick={() => ampliarPokemon(pokemon)}
        >
          <Card.Img variant="top" src={pokemon.sprites.front_default} />
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
            {ampliacionPokemon === pokemon && (
              // Muestra la informacion adicional del Pokemon si esta ampliado
              <div>
                <Card.Text>Type: {pokemon.types[0].type.name}</Card.Text>
                <Card.Text>Abilities:</Card.Text>
                <ul>
                  {pokemon.abilities.map(ability => (
                    // Itera sobre las habilidades del Pokemon y las muestra como elemenetos de la lista
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Home;

