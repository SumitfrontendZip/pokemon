import './Pokemon.css'
function Pokemon({ name, image, types }) {
    return (
        <div className='pokemon-wrapper'>
            <img src={image} alt="" />
            <div className='pokemon-name-heading'>{name}</div>
            <div className="pokemon-types">
                {
                    types.map((type, idx) => <li key={idx}>{type.type.name}</li>)
                }
            </div>
        </div>
    )
}

export default Pokemon
