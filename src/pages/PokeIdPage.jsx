import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom';
import './styles/pokeIdPage.css'

const PokeIdPage = () => {

  const [pokeData, getPokeData] = useFetch();
  const param = useParams();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`
    getPokeData(url)
  }, [])

  return (
    <div className='container__principal'>
      <div className='header__poke'>
        <section className='red__header'>
          <figure>
            <img src="https://s3-alpha-sig.figma.com/img/ca59/d9ce/98042af437fdff212d3259040db2e2db?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kOm5w5TcCw53ef8P2P6IuQaKTuzpnWuLA490ztpp1yn5H86pcYWKNXR-HOeuWTSfkoCgbdzPGITr4xfjxo~35f9lm6vMKLEyKPsvE4HFzpCKLLBL5n3-4eAsGu4xGsFboBtTNj~MI5pcldAXnJNTN5VCaYReOePnOsYOg2VHU4jSazNlLNe1oaDhlq-kFvRpeJ4wd8ask-u41~s5h6CTDdCkcSZs3pkIO9mUfDKbIhCSkr2g4Ii2ST3ZVmtlhLMtRQoEA7VG1zfEOEIbQfGSq2fMuYNiD97vMp3Kb6wCu2TNpVlpKGj9aLP2dcngZd7AyrnTjBV1ks8KIQ~22KLKFA__" alt="" />
          </figure>
          </section>
          <section className='circle__header'>
            <section className='center__header'></section>
          </section>
            <section className='black__header'></section>
      </div>
      <div className="pokeinfoid">
        <article className="article__pokeinfoid">
          <header
            className={`header__header--pokeinfoid ${pokeData?.types[0].type.name}-gradient`}
          >
            <img className="img__header--pokeinfoid"
            src={pokeData?.sprites.other['official-artwork'].front_default} alt={pokeData?.name} />
          </header>
          <section className="section__name--pokeinfoid">
            <h3 className={`info__id ${pokeData?.types[0].type.name}-name`}>
              #{pokeData?.id}
            </h3>
            <h2 className={`info__name ${pokeData?.types[0].type.name}-name`}>
              {pokeData?.name}
            </h2>
          </section>
          <section className="section__info--pokeinfoid">
            <ul className="ul__info--pokeinfoid">
            <li className="li__info--pokeinfoid">
                <p className="span__info--pokeinfoid">Peso</p>
                {pokeData?.weight}
              </li>
              <li className="li__info--pokeinfoid">
                <p className="span__info--pokeinfoid">Altura</p>
                {pokeData?.height}
              </li>
            </ul>
          </section>
          <article className="article__types--pokemon">
            <section className="section__types--pokemon">
              <h2 className="title__types">Type</h2>
              <ul className="ul__types">
                {pokeData?.types.map((type) => (
                  <li
                    className={`li__types ${pokeData?.types[0].type.name}-gradient`}
                    key={type.type.url}
                  >
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </section>
            <section className="section__types--pokemon">
              <h2 className="title__types">Abilities</h2>
              <ul className="ul__types">
                {pokeData?.abilities.map((ability) => (
                  <li className="li__abilitie" key={ability.ability.url}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </section>
          </article>
          <section className="section__stats--pokemon">
            <h2 className="title__stats--pokemon">Stats</h2>
            <ul className="ul__stats--pokemon">
              {
                pokeData?.stats.map(stat => (
                  !stat.stat.name.includes('special') &&
                <li className="li__stats--pokemon" key={stat.stat.url}>
                  <div className="info__stats--pokemon">
                    <p className="name__stats--pokemon">
                      {stat.stat.name}
                    </p>
                    <p className="base__stats--pokemon">
                      {stat.base_stat}/150
                    </p>
                  </div>
                  <div className="bar__stats--pokemon">
                    <div
                      className="filler__stats--pokemon"
                      style={{ width: `${(stat.base_stat / 150) * 100}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <article className="article__movement">
          <section className="section__movement">
            <h2 className="title__movement">Movements</h2>
            <ul className="ul__movement">
              {pokeData?.moves.slice(0, 25).map((move) => (
                <li className="li__movement" key={move.move.url}>
                  {move.move.name}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PokeIdPage;