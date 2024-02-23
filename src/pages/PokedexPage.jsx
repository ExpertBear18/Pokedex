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
                <img src="https://s3-alpha-sig.figma.com/img/ca59/d9ce/98042af437fdff212d3259040db2e2db?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kOm5w5TcCw53ef8P2P6IuQaKTuzpnWuLA490ztpp1yn5H86pcYWKNXR-HOeuWTSfkoCgbdzPGITr4xfjxo~35f9lm6vMKLEyKPsvE4HFzpCKLLBL5n3-4eAsGu4xGsFboBtTNj~MI5pcldAXnJNTN5VCaYReOePnOsYOg2VHU4jSazNlLNe1oaDhlq-kFvRpeJ4wd8ask-u41~s5h6CTDdCkcSZs3pkIO9mUfDKbIhCSkr2g4Ii2ST3ZVmtlhLMtRQoEA7VG1zfEOEIbQfGSq2fMuYNiD97vMp3Kb6wCu2TNpVlpKGj9aLP2dcngZd7AyrnTjBV1ks8KIQ~22KLKFA__" alt="" />
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
