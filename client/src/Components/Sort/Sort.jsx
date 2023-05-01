import React from 'react'
import { useDispatch } from 'react-redux'
import { orderAlphabet, orderByAttack } from '../../Redux/actions'
import s from './sort.module.css'

function Sort({setCurrentPage, setOrden}) {
const dispatch = useDispatch()

  const handleAttack = (e) => {    
    const attackLevel = e.target.value
    dispatch(orderByAttack(attackLevel))
    setCurrentPage(1)
    setOrden(`Ordenado ${attackLevel}`)
  }

  const handleAbc = (e) => {
    const order = e.target.value
    dispatch(orderAlphabet(order))
    setCurrentPage(1)
    setOrden(`Ordenado ${order}`)
  }
  return (
    <div className={s.container}>
      <h4>Alphabet</h4>
        <select onChange={handleAbc}>
            <option value="asc">A to Z</option>
            <option value="des">Z to A</option>
        </select>
        <h4>Attack Level</h4>
        <select onChange={handleAttack}>
            <option value="max">Max Attack</option>
            <option value="min">Min Attack</option>
        </select>
    </div>
  )
}

export default Sort