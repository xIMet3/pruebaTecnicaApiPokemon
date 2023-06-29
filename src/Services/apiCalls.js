import axios from 'axios';

function getPokemonDetails() {
  return axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
}

export default getPokemonDetails;