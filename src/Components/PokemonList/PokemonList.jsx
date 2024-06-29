import { useEffect, useState } from "react"
import axios from "axios"
import Pokemon from "../Pokemon/Pokemon"
import './PokemonList.css'
function PokemonList() {
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [nextURL, setNextURL] = useState('')
    const [prevURL, setPrevURL] = useState('')
    const [pokedexURL, setPokedexURL] = useState('https://pokeapi.co/api/v2/pokemon')

    const downloadPokemon = async () => {
        const response = await axios.get(pokedexURL);
        const pokemonResults = response.data.results
        setPrevURL(() => response.data.previous)
        setNextURL(() => response.data.next)
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonResultPromise)
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
    }, [pokedexURL])

    return (

        <>
            <div className="pokemon-list-wrapper">
                {
                    isLoading ? pokemonList.map((pokemon) =>
                        <Pokemon name={pokemon.name} key={pokemon.id} id={pokemon.id} image={pokemon.image} types={pokemon.types} />
                    ) : <div className="loader"></div>
                }
            </div>
            <div className="buttons">
                <button disabled={prevURL === null} onClick={() => setPokedexURL(prevURL)}>Prev</button>
                <button disabled={nextURL === null} onClick={() => setPokedexURL(nextURL)}>Next</button>
            </div>
        </>
    )
}

export default PokemonList
