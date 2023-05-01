import React from 'react'
// import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import s from './cardsContainer.module.css'

function CardsContainer({currentPokemons}) {
  //  const pokemons = useSelector(state=> state.pokemons) 
   

  return (
    <div className={s.container}>
        {currentPokemons?.map((pok, i) => <Card key={i} id={pok.id} name={pok.name} types={pok.types} img={pok.img} created={pok.created}/>)}
    </div>
  )
}

export default CardsContainer