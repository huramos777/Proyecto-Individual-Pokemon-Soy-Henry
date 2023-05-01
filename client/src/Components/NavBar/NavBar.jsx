import React from 'react'
import { Link, NavLink } from 'react-router-dom' 
import s from './navBar.module.css'
import SearchBar from '../SearchBar/SearchBar'
import logo from "../../img/logoLanding.png"
import { useDispatch } from 'react-redux'
import { getPokemons } from '../../Redux/actions'

function NavBar() {
const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(getPokemons())
  }
  return (
    <div className={s.container}>
      
      <Link to={"/"}>
      <img className={s.logo} src={logo} alt="logo_pokemon" />
      </Link>
        <NavLink className={s.navlink} to={"/home"}><p onClick={handleClick} className={s.p}>HOME</p></NavLink> 
        <NavLink className={s.navlink} to={"/form"}><p className={s.p}>CREATE</p></NavLink>
        <div>
         <SearchBar />   
        </div> 
    </div>
  )
}

export default NavBar