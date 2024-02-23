 import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import './styles/pokeCard.css'

const PokeCard = ({ url }) => {

    const [pokemon, getPokemon] = useFetch();

    const navigate = useNavigate();

    useEffect(() => {
      getPokemon(url)
    }, [])

    const handleClick = () => {
      navigate(`/pokedex/${pokemon.id}`)
    }

  return (
    <article onClick={handleClick} className={`poke__card ${pokemon?.types[0].type.name}__card`}>
      <div className={pokemon?.types[0].type.name}></div>
      <figure>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon photo" />
      </figure>
      <h3 className={`${pokemon?.types[0].type.name}__name`}>{pokemon?.name}</h3>
      <ul className={'poke__types'}>
        {
          pokemon?.types.map(type => (
            <li key={type.type.url} className={`slot${type.slot}`}>
              {type.type.name}
            </li>
          ))
        }
      </ul>
      <p><span>Type</span></p>
      <ul className='poke__stats'>
      {
          pokemon?.stats.map(stat => (
            !stat.stat.name.includes('special') &&
            <li key={stat.stat.url}><span className="stats--name">{stat.stat.name}</span>
            <span className={`${pokemon?.types[0].type.name}__stat`}>{stat.base_stat}</span>
            </li>
          ))
        }
      </ul>
    </article>
  )
}

export default PokeCard;