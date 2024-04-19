import React, { useRef } from 'react'
import { setTrainerName } from '../store/slices/trainerName.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/homePage.css'

const HomePage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainerName(textInput.current.value.trim()));
    navigate('/pokedex');
  }

  return (
    <div className='homepage'>
      <div className='homepage__header'>
        <figure>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
        </figure>
        <div className='home__text'>
          <h1>¡Hola Entrenador!</h1>
          <h2>Para poder comenzar, dame tu nombre</h2>
        </div>
        <form className='home__form' onSubmit={handleSubmit}>
          <input
          placeholder='Tu nombre...'
          type="text"
          ref={textInput}/>
          <button>Comenzar</button>
        </form>
      </div>
      <div className='homepage__footer'>
        <section className='section__red'></section>
        <section className='section__circle'>
          <section className='circle__center'></section>
        </section>
        <section className='section__black'></section>
      </div>
    </div>
  )
}

export default HomePage;