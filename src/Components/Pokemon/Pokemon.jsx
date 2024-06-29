import { Link } from 'react-router-dom'
import './Pokemon.css'
function Pokemon({ name, image, types, id }) {
    return (
        <Link to={`/${name}/${id}`}>
            <div className='pokemon-wrapper'>
                <img src={image} alt="" />
                <div className='pokemon-name-heading'>{name}</div>
                <div className="pokemon-types">
                    {
                        types.map((type, idx) => <li key={idx}>{type.type.name}</li>)
                    }
                </div>
            </div>
        </Link>
    )
}

export default Pokemon
