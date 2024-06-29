import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemonDetailsObject, setPokemonDetailsObject] = useState({
    name: '',
    id: '',
    height: '',
    weight: '',
    types: [],
    images: ''
  });

  const downloadPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemonResults = response.data;

    setPokemonDetailsObject({
      name: pokemonResults.name,
      id: pokemonResults.id,
      height: pokemonResults.height,
      weight: pokemonResults.weight,
      types: pokemonResults.types.map((type) => type.type.name),
      images: (pokemonResults.sprites.other) ? pokemonResults.sprites.other.dream_world.front_default : pokemonResults.sprites.front_shiny,
    });
  };

  useEffect(() => {
    downloadPokemon();
  }, [id]);

  return (
    <div className="pokemonDetails-wrapper">
      <img src={pokemonDetailsObject.images} alt={pokemonDetailsObject.name} />
      <h2>{pokemonDetailsObject.name}</h2>
      <span>Height: {pokemonDetailsObject.height}</span>
      <span>Weight: {pokemonDetailsObject.weight}</span>
      <span>
        <ul>
          {pokemonDetailsObject.types.map((type, idx) => (
            <li key={idx}>{type}</li>
          ))}
        </ul>
      </span>
    </div>
  );
}

export default PokemonDetails;
