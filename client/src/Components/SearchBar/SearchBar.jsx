import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchPokemon } from '../../Redux/actions'
import s from './searchBar.module.css'

function SearchBar() {
const [input, setInput] = useState('')
const dispatch = useDispatch()

const handleInput = (e) => {
setInput(e.target.value)
}

const handleClick = () =>{
  dispatch(searchPokemon(input))
  setInput('')
}
  return (
    <div className={s.container}>
        <input className={s.input} value={input} onChange={handleInput} type="text" placeholder='Enter a name'/>
        <button className={s.button} onClick={handleClick}>Search</button>
    </div>
  )
}

export default SearchBar