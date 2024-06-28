import './SearchBar.css';


function SearchBar() {
    return (
        <div className='search-wrapper'>
            <input
                id='pokemon-name-search'
                type="text"
                placeholder="Pokemon Name"
            />
        </div>
    )
}

export default SearchBar
