import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function PokemonDetails() {
  const { id } = useParams()
  const [pokemonDetailsObject, setPokemonDetailsObject] = useState({})
  const downloadPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemonResults = response.data
    
    setPokemonDetailsObject(() => {
      return {
        name: pokemonResults.name,
        id: pokemonResults.id,
        height: pokemonResults.height,
        weight: pokemonResults.weight,
        types: pokemonResults.types.map((type) => type.type.name),
        images: (pokemonResults.sprites.other) ? pokemonResults.sprites.other.dream_world.front_default : pokemonResults.sprites.front_shiny,
      }
    })

    setIsLoading(() => true)
  }

  useEffect(() => {
    downloadPokemon()
  }, [pokemonDetailsObject.id])


  return (
    <div>
     <img src={pokemonDetailsObject.images} alt="" />
     <h2>{pokemonDetailsObject.name}</h2>
    <span>{pokemonDetailsObject.height}</span>
    <span>{pokemonDetailsObject.weight}</span>
    </div>
  )
}

export default PokemonDetails