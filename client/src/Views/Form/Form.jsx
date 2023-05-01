import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from "./form.module.css"
import { createPokemon, getTypes } from '../../Redux/actions'
import { useHistory } from 'react-router-dom'

function Form() {
  
  const history = useHistory()
const dispatch = useDispatch()
const types = useSelector(state=>state.types)

const [form, setForm] = useState({
  name: '',
  hp: '',
  attack: '',
  defense: '',
  speed: '',
  weight: '',
  height: '',
  img: '',
  types: []
})

const [errors, setErrors] = useState({})

useEffect(()=>{
dispatch(getTypes())
}, [dispatch])


const validate = (form) => {
  const errors = {};

  // name
  if (!form.name.length) {
    errors.name = "Ingrese un nombre";
  } else if (!/^[a-zA-Z]+$/.test(form.name)) {
    errors.name = "Hay un error en el nombre";
  }

  // hp
  const hp = parseInt(form.hp);
  if (isNaN(hp) || hp < 1 || hp > 255) {
    errors.hp = "Debe ser entre 1 y 255";
  }

  // attack
  const attack = parseInt(form.attack);
  if (isNaN(attack) || attack < 1 || attack > 255) {
    errors.attack = "Debe ser entre 1 y 255";
  }

  // defense   
  const defense = parseInt(form.defense);
  if (isNaN(defense) || defense < 1 || defense > 255) {
    errors.defense = "Debe ser entre 1 y 255";
  }

  // speed
  const speed = parseInt(form.speed);
  if (isNaN(speed) || speed < 1 || speed > 255) {
    errors.speed = "Debe ser entre 1 y 255";
  }
  
  // weight
  const weight = parseInt(form.weight);
  if (isNaN(weight) || weight < 1 || weight > 100) {
    errors.weight = "Debe ser entre 1 y 100";
  }
  // height
  const height = parseInt(form.height);
  if (isNaN(height) || height < 1 || height > 100) {
    errors.height = "Debe ser entre 1 y 100";
  }

  // image
  const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  if (!urlRegex.test(form.img)) {
    errors.img = "Invalid URL"
  }
  
  // types
  if (!form.types.length) {errors.types = "Must choose a pokemon type"}
  if (form.types.length > 2) {errors.types = "You can't choose more than 2 types per Pokemon"}

  setErrors(errors);
};

const handleChange = (e) => {
  const property = e.target.name
  const value = e.target.value
  //aca en validate le paso el form tal cual lo va a recibir en un momento para evitar el delay de un caracter
  validate({...form, [property]: value})
  setForm({...form, [property]: value})
}

const handleTypes = (e) => {
  if(e.target.checked) {
    setForm({...form, types: [...form.types, e.target.value]})
  }
}

const handleSubmit = (e) => {
  if(form.name.length === 0) {
    e.preventDefault()
    alert('Missing data')
  } else {
    e.preventDefault()
  dispatch(createPokemon(form))  
  setForm({
  name: '',
  hp: '',
  attack: '',
  defense: '',
  speed: '',
  weight: '',
  height: '',
  img: '',
  types: []
})
  alert('The pokemon was created...')
  history.push("/home")
  }
  
}

const handleReset = () => {
  setForm({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    weight: '',
    height: '',
    img: '',
    types: []
  })
  setErrors({})
}


  return (
    <div className={s.masterContainer}>
      <div className={s.container}>
        <form className={s.form} onSubmit={handleSubmit}>
        <h1 className={s.formTitle}>CREATE YOUR POKEMON</h1>
      <div className={s.divs}>
        <label>Name</label>
        <input name='name' value={form.name} onChange={handleChange} type="text" />
        <span>{errors.name}</span>
      </div>
      <div className={s.divs}>
        <label>HP</label>
        <input name='hp' value={form.hp} onChange={handleChange} type="range" min='1' max='256' />
        {errors.hp ? <span>{errors.hp}</span>: <span>{form.hp}</span> }
        
      </div>
      <div className={s.divs}>
        <label>Attack</label>
        <input name='attack' value={form.attack} onChange={handleChange} type="range" min='1' max='256' />
        {errors.attack ? <span>{errors.attack}</span>: <span>{form.attack}</span> }
      </div>
      <div className={s.divs}>
        <label>Defense</label>
        <input name='defense' value={form.defense} onChange={handleChange} type="range" min='1' max='256' />
        {errors.defense ? <span>{errors.defense}</span>: <span>{form.defense}</span> }
      </div>
      <div className={s.divs}>
        <label>Speed</label>
        <input name='speed' value={form.speed} onChange={handleChange} type="range" min='1' max='256' />
        {errors.speed ? <span>{errors.speed}</span>: <span>{form.speed}</span> }
      </div>
      <div className={s.divs}>
        <label>Weight</label>
        <input name='weight' value={form.weight} onChange={handleChange} type="range" min='1' max='101' />
        {errors.weight ? <span>{errors.weight}</span>: <span>{form.weight}</span> }
      </div>
      <div className={s.divs}>
        <label>Height</label>
        <input name='height' value={form.height} onChange={handleChange} type="range" min='1' max='101' />
        {errors.height ? <span>{errors.height}</span>: <span>{form.height}</span> }
      </div>
      <div className={s.divs} >
        <label>Image</label>
        <input name='img' value={form.img} onChange={handleChange} type="text" />
        {errors.img && <span>{errors.img}</span>}
      </div>
      <div className={s.types}>
        <label > <span className={s.spanTypes}>Types:</span> </label>
        {types?.map((type, i)=>( 
        <label key={i}>
        <input  name='types' value={type.id} onChange={handleTypes} type="checkbox" />
        {type.name}
        </label>
        ))}
        {errors.types && <span>{errors.types}</span>}      
      </div>
      {/*                                   si no hay errores           activo - desactivo */}
      <button className={s.createButton} type='submit' disabled={Object.keys(errors).length === 0 ? false : true}>Create</button>
      <button className={s.createButton} onClick={handleReset}>Reset Form</button>
    </form>
    </div>
    </div>
  )
}

export default Form

