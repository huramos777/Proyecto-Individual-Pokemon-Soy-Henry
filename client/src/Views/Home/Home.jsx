import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPokemons, getTypes, randomSearch } from '../../Redux/actions'
import CardsContainer from '../../Components/CardsContainer/CardsContainer'
import Filters from '../../Components/Filters/Filters'
import Sort from '../../Components/Sort/Sort'
import Pagination from '../../Components/Pagination/Pagination'
import s from "./home.module.css"

function Home() {
const dispatch = useDispatch()  

useEffect(()=>{
dispatch(getPokemons())
dispatch(getTypes())
}, [dispatch])

const types = useSelector(state=>state.types)
const allPokemons = useSelector(state=>state.pokemons)

const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [pokemonsPerPage, setPokemonsPerPage] = useState(12)  
const indexOfLastPokemon = currentPage * pokemonsPerPage
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
console.log(orden);

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)  
}

const handleRefresh = () => {
  dispatch(getPokemons())
  setCurrentPage(1)
  setPokemonsPerPage(12)
}

const handleOneMore = () => {
  setPokemonsPerPage(pokemonsPerPage + 1)
  setCurrentPage(1)
}

const handleRandom = () => {
  const id = Math.floor(Math.random() * 60);
  dispatch(randomSearch(id))
}

  return (
    <div>
        
        <div className={s.selectContainer}>
        <Filters types={types} setOrden={setOrden} setCurrentPage={setCurrentPage}/>
        <button className={s.button} onClick={handleRefresh}>PokeRefresh</button>
        <button className={s.button} onClick={handleRandom}>Random Search</button>
        <Sort setOrden={setOrden} setCurrentPage={setCurrentPage}/>
        </div>
        
        <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado}/>
        <CardsContainer currentPokemons={currentPokemons}/>
        <button className={s.button} onClick={handleOneMore}>One More</button>
        <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado}/>
    </div>
  )
}

export default Home


/* 

import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPokemons, getTypes } from '../../Redux/actions'
import CardsContainer from '../../Components/CardsContainer/CardsContainer'
import Filters from '../../Components/Filters/Filters'
import Sort from '../../Components/Sort/Sort'
import Pagination from '../../Components/Pagination/Pagination'
import s from "./home.module.css"

function Home() {
const dispatch = useDispatch()  
useEffect(()=>{
dispatch(getPokemons())
dispatch(getTypes())
}, [dispatch])

const types = useSelector(state=>state.types)
const allPokemons = useSelector(state=>state.pokemons)

const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const pokemonsPerPage = 12  
const indexOfLastPokemon = currentPage * pokemonsPerPage
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
console.log(orden);

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)  
}

const handleRefresh = () => {
  dispatch(getPokemons())
}
  return (
    <div>
        
        <div className={s.selectContainer}>
        <Filters types={types} setOrden={setOrden} setCurrentPage={setCurrentPage}/>
        <button className={s.button} onClick={handleRefresh}>PokeRefresh</button>
        <Sort setOrden={setOrden} setCurrentPage={setCurrentPage}/>
        </div>
        
        <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado}/>
        <CardsContainer currentPokemons={currentPokemons}/>
        <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado}/>
    </div>
  )
}

export default Home

*/