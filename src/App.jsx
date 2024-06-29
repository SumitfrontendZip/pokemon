import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import PokemonList from './Components/PokemonList/PokemonList'
import PokemonDetails from './Components/PokemonDetails/PokemonDetails'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <PokemonList />
        </>
      )
    }, {
      path: '/:pokemon/:id',
      element: (
        <>
          <PokemonDetails />
        </>
      )
    }
  ])
  return (
    <>
      <Pokedex />
      <RouterProvider router={router} />
    </>
  )
}

export default App
