import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css';

function PokemonList() {
    const [pokemonDataList, setPokemonDataList] = useState({
        isLoading: false,
        pokedexURL: 'https://pokeapi.co/api/v2/pokemon',
        nextURL: '',
        prevURL: '',
        pokemonList: [],
    });

    const downloadPokemon = async () => {
        setPokemonDataList((prevState) => ({ ...prevState, isLoading: false }));
        const response = await axios.get(pokemonDataList.pokedexURL);
        const pokemonResults = response.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        setPokemonDataList((prevState) => ({
            ...prevState,
            isLoading: true,
            prevURL: response.data.previous,
            nextURL: response.data.next,
            pokemonList: pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types: pokemon.types.map((type) => type.type.name),
                };
            }),
        }));
    };

    useEffect(() => {
        downloadPokemon();
    }, [pokemonDataList.pokedexURL]);

    return (
        <>
            <div className="pokemon-list-wrapper">
                {pokemonDataList.isLoading ? (
                    pokemonDataList.pokemonList.map((pokemon) => (
                        <Pokemon
                            name={pokemon.name}
                            key={pokemon.id}
                            id={pokemon.id}
                            image={pokemon.image}
                            types={pokemon.types}
                        />
                    ))
                ) : (
                    <div className="loader"></div>
                )}
            </div>
            <div className="buttons">
                <button
                    disabled={!pokemonDataList.prevURL}
                    onClick={() =>
                        setPokemonDataList((prevState) => ({
                            ...prevState,
                            pokedexURL: pokemonDataList.prevURL,
                        }))
                    }
                >
                    Prev
                </button>
                <button
                    disabled={!pokemonDataList.nextURL}
                    onClick={() =>
                        setPokemonDataList((prevState) => ({
                            ...prevState,
                            pokedexURL: pokemonDataList.nextURL,
                        }))
                    }
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default PokemonList;
