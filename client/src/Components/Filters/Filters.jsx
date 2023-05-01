import React from 'react'
import { useDispatch } from 'react-redux';
import { filterByOrigin, filterByTypes } from '../../Redux/actions';
import s from './filters.module.css'

function Filters({types, setCurrentPage, setOrden}) {
  const dispatch = useDispatch()


  const handleOriginFilter = (e) => {
    const origin = e.target.value
    setCurrentPage(1)
    dispatch(filterByOrigin(origin))
  }

  const hanldeTypeFilter = (e) => {
    const type = e.target.value
    setCurrentPage(1)
    dispatch(filterByTypes(type))
  }

  return (
    <div className={s.container}>
        <h4>By Origin</h4>
        <select onChange={handleOriginFilter}>
            <option value="all">All</option>
            <option value={'db'}>Created</option>
            <option value={'api'}>Existing</option>
        </select>
        <h4>By Type</h4>
        <select onChange={hanldeTypeFilter}>
            <option value={'all'}>All</option>
            {types?.map((type,i) => <option key={i} value={type.name}>{type.name}</option>)}            
        </select>
    </div>
  )
}

export default Filters