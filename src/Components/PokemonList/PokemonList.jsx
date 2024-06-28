import { useEffect, useState } from "react"
import axios from "axios"
import Pokemon from "../Pokemon/Pokemon"
import './PokemonList.css'
function PokemonList() {

    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const downloadPokemon = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResults = response.data.results
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonResultPromise)
        console.log(pokemonData);
        setPokemonList(pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        }))
        setIsLoading(() => true)
    }

    useEffect(() => {
        downloadPokemon()
    }, [])

    return (
        <div className="pokemon-list-wrapper">
            {
                pokemonList.map((pokemon) =>
                    <Pokemon name={pokemon.name} key={pokemon.id} image={pokemon.image} types={pokemon.types}/>
                )
            }
        </div>
    )
}

export default PokemonList
