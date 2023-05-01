import React from 'react'
import { useHistory } from 'react-router-dom'
import s from './landing.module.css'
import logo from '../../img/logoLanding.png'

function Landing() {

  const history = useHistory()

  const handleClick = () => {
    history.push("/home")
    
  }
  return (
    <div className={s.container}>
        
        <img className={s.logo} src={logo} alt="logo_landing" />
        <button className={s.button} onClick={handleClick}>Go Home...</button>
    </div>
  )
}

export default Landing