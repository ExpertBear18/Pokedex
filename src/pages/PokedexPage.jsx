import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../hooks/useFetch'
import PokeCard from '../components/pokedexPage/PokeCard';
import SelectType from '../components/pokedexPage/SelectType';
import PaginationPage from '../components/pokedexPage/PaginationPage';
import '../pages/styles/pokedexPage.css'

const PokedexPage = () => {

  const [selectValue, setselectValue] = useState('allPokemons');
  const [page, setPage] = useState(0);
  const [limitPokemon, setLimitPokemon] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const pokemonName = useSelector(store => store.pokemonName);
  const trainerName = useSelector(store => store.trainerName);
  const dispatch = useDispatch();
  const [pokemons, getPokemons, getPerType] = useFetch();

  useEffect(() => {
    setTotalPages(Math.ceil(pokemons?.count / limitPokemon) || 1);
  }, [pokemons, limitPokemon]);

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limitPokemon}&offset=${page}`;
      getPokemons(url);
    } else {
      getPerType(selectValue);
    }
  }, [selectValue, page, limitPokemon, getPokemons, getPerType])

  const textInput = useRef();

  const handleSumbit = (event) => {
    event.preventDefault()
    dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()));
    textInput.current.value = '';
  }

  const handleLimitChange = (event) => {
    setLimitPokemon(parseInt(event.target.value));
  }

  const cbFilter = () => {
    if (pokemonName) {
      return pokemons?.results.filter(element => element.name.includes(pokemonName));
    } else {
      return pokemons?.results;
    }
  }

  return (
    <div className='pokedex'>
      <section className='poke__header'>
        <div>
          <section className='section__redHeader'>
              <figure>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
              </figure>
          </section>
          <section className='section__circleHeader'>
            <section className='circle__centerHeader'></section>
          </section>
          <section className='section__blackHeader'></section>
        </div>
        <h3><span className='page__h3'>Bienvenido/a {trainerName}, </span>Aqui podras encontrar tu pokemon favorito</h3>
        <div className='div__forms'>
          <form onSubmit={handleSumbit}>
            <input
            placeholder='Busca un Pokemón'
            type="text"
            ref={textInput} />
            <button>Buscar</button>
          </form>
          <SelectType
            setselectValue={setselectValue}
          />
          <select
          className='select__pokeCant'
          value={setLimitPokemon}
          onChange={handleLimitChange}>
            <option value="24">Cantidad de Pokemones</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      </section>
      <section className='poke__container'>
        {
          cbFilter()?.map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </section>
      <section className="section__pagination--pokemons">
        <PaginationPage
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          limitPokemon={limitPokemon}
        />
      </section>
    </div>
  )
}

export default PokedexPage;
