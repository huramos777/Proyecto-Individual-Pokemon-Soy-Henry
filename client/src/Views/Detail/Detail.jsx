import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { cleanDetail, getPokemonDetail } from '../../Redux/actions'
import s from './detail.module.css'

function Detail() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(()=>{
  dispatch(getPokemonDetail(id))
  return function () {
    dispatch(cleanDetail())
  }
  },[dispatch, id])
  
  const goHome = () => {
    history.push("/home")
  }
  const state = useSelector(state=>state.detail)
  const pokemon = state[0]  
  const loading = <h1 className={s.loading}>LOADING...</h1>
  
  
    return (    
    <div className={s.mainContainer}>
      <button className={s.button} onClick={goHome}>Go Back</button>
      <div className={s.container}>
      
        <div className={s.detailContainer}>          
          
          <p className={s.name}>{pokemon?.name.toUpperCase()}</p>
          <p>ID: {pokemon?.id}</p>
          <p>HP: {pokemon?.hp}</p>
          <p>Attack: {pokemon?.attack}</p>
          <p>Defense: {pokemon?.defense}</p>
          <p>Speed: {pokemon?.speed}</p>
          <p>Height: {pokemon?.height}</p>
          <p>Weight: {pokemon?.weight}</p>
          <p>Types: {pokemon?.created ? (pokemon.types?.map(type => type.name)).join(", ") : pokemon?.types}</p>
         </div>
          {!pokemon?.img ? loading : <img className={s.img} src={pokemon?.img} alt={pokemon?.name} />}
          
          
      </div>
     
    </div >
    )
}

export default Detail


/* 

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { cleanDetail, getPokemonDetail } from '../../Redux/actions'
import s from './detail.module.css'

function Detail() {
const {id} = useParams()
const dispatch = useDispatch()
const history = useHistory()

useEffect(()=>{
dispatch(getPokemonDetail(id))
return function () {
  dispatch(cleanDetail())
}
},[dispatch, id])

const goHome = () => {
  history.push("/home")
}
const state = useSelector(state=>state.detail)
const pokemon = state[0]
const loading = <h1 className={s.loading}>LOADING...</h1>


  return (    
  <div className={s.mainContainer}>
    <button className={s.button} onClick={goHome}>Go Back</button>
    <div className={s.container}>
    
      <div className={s.detailContainer}>          
        
        <p className={s.name}>{pokemon?.name.toUpperCase()}</p>
        <p>ID: {pokemon?.id}</p>
        <p>HP: {pokemon?.hp}</p>
        <p>Attack: {pokemon?.attack}</p>
        <p>Defense: {pokemon?.defense}</p>
        <p>Speed: {pokemon?.speed}</p>
        <p>Height: {pokemon?.height}</p>
        <p>Weight: {pokemon?.weight}</p>
        <p>Types: {pokemon?.created ? (pokemon.types?.map(type => type.name)).join(", ") : pokemon?.types}</p>
       </div>
        {!pokemon?.img ? loading : <img className={s.img} src={pokemon?.img} alt={pokemon?.name} />}
        
    </div>
   
  </div >
  )
}

export default Detail

*/