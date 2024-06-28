import SearchBar from "../SearchBar/SearchBar"
import './Pokedex.css'

function Pokedex() {
    return (
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading">Pokedex</h1>
            <SearchBar />
        </div>
    )
}

export default Pokedex
