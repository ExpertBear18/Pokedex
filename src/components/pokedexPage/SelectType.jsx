import React, { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch';
import { setPokemonName } from '../../store/slices/pokemonName.slice';
import { useDispatch } from 'react-redux';
import './styles/selectType.css'

const SelectType = ({ setselectValue }) => {

    const [types, getTypes] = useFetch();
    const dispatch = useDispatch()

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/type'
        getTypes(url)
      }, []);

      const textSelect = useRef()

      const handleChange = () => {
        setselectValue(textSelect.current.value)
        dispatch(setPokemonName(''));
      }

  return (
    <select className='select__type' onChange={handleChange} ref={textSelect}>
        <option value="allPokemons">Todos los Pokemones</option>
        {
            types?.results.map(type => (
                <option
                    key={type.url}
                    value={type.url}>
                    {type.name}
                </option>
            ))
        }
    </select>
  )
}

export default SelectType;