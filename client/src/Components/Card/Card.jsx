import React from 'react'
import s from './card.module.css'
import { Link } from 'react-router-dom'
import pika from '../../img/pika-confused.png'

function Card({id, name, types, img, created}) {
  //con este error verifico si no se encontro en el back
  const error = 'No se encontraron coincidencias'

  return (   

    <div className={s.container}>
        
        <h1>{name === error ? <p>NOT FOUND</p> : name}</h1> 
        <Link to={name === error ? "/home" :`/detail/${id}`}>
            <img className={s.img} src={name === error ? img = pika : img} alt={`imagen de ${name}`} />
        </Link>        
        <h2> {types} </h2>
    </div>
  )
}

export default Card


/* 

import React from 'react'
import s from './card.module.css'
import { Link } from 'react-router-dom'
import pika from '../../img/pika-confused.png'

function Card({id, name, types, img, created}) {
  //con este error verifico si no se encontro en el back
  const error = 'No se encontraron coincidencias'

  return (   

    <div className={s.container}>
        
        <h1>{name === error ? <p>NOT FOUND</p> : name}</h1> 
        <Link to={name === error ? "/home" :`/detail/${id}`}>
            <img className={s.img} src={name === error ? img = pika : img} alt={`imagen de ${name}`} />
        </Link>        
        <h2> {created ? (types.map(type => type.name)).join(", ") : types} </h2>
    </div>
  )
}

export default Card

*/