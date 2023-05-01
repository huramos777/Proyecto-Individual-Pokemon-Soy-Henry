import React from 'react'
import s from "./paginatio.module.css"

function Pagination({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = []

    for( let i = 0 ; i < Math.ceil(allPokemons / pokemonsPerPage) ; i++) {
        pageNumbers.push(i+1)
    }
  return (
    <nav>
        <ul className={s.ul}>
            {
                pageNumbers?.map(number => (
                    <li  key={number}>
                        <p className={s.p} onClick={()=>paginado(number)}>{number}</p>
                    </li>
                ))
            }
        </ul>
        
    </nav>
  )
}

export default Pagination

/* 

import React from 'react'
import s from "./paginatio.module.css"

function Pagination({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = []

    for( let i = 0 ; i < Math.ceil(allPokemons / pokemonsPerPage) ; i++) {
        pageNumbers.push(i+1)
    }
  return (
    <nav>
        <ul className={s.ul}>
            {
                pageNumbers?.map(number => (
                    <li className={s.li} key={number}>
                        <p className={s.p} onClick={()=>paginado(number)}>{number}</p>
                    </li>
                ))
            }
        </ul>
        
    </nav>
  )
}

export default Pagination

*/