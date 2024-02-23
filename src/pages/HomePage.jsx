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
        <img src="https://s3-alpha-sig.figma.com/img/ca59/d9ce/98042af437fdff212d3259040db2e2db?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kOm5w5TcCw53ef8P2P6IuQaKTuzpnWuLA490ztpp1yn5H86pcYWKNXR-HOeuWTSfkoCgbdzPGITr4xfjxo~35f9lm6vMKLEyKPsvE4HFzpCKLLBL5n3-4eAsGu4xGsFboBtTNj~MI5pcldAXnJNTN5VCaYReOePnOsYOg2VHU4jSazNlLNe1oaDhlq-kFvRpeJ4wd8ask-u41~s5h6CTDdCkcSZs3pkIO9mUfDKbIhCSkr2g4Ii2ST3ZVmtlhLMtRQoEA7VG1zfEOEIbQfGSq2fMuYNiD97vMp3Kb6wCu2TNpVlpKGj9aLP2dcngZd7AyrnTjBV1ks8KIQ~22KLKFA__" alt="" />
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