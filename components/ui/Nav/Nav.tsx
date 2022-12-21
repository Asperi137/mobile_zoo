import classes from './Nav.module.css'
import IsConnected from 'lib/isConnected'
import Link from 'next/link'
import NavEnclos from './NavEnclos'
import NavEspeces from './NavEspeces'
import { useState } from 'react'
import NavAnimaux from './NavAnimaux'

export default function Nav () {
  const [affichage, setAffichage] = useState('')

  function modifAffichage (event: any) {
    event.preventDefault()
    if (affichage === event.target.name) setAffichage('')
    else setAffichage(event.target.name)
  }

  return (
    <>
      {IsConnected() && (
        <>
          {affichage === 'enclos' && <NavEnclos />}
          {affichage === 'especes' && <NavEspeces />}
          {affichage === 'animaux' && <NavAnimaux />}
          <nav className={classes.contH}>
            <Link href='/evenements'>
              <button>Evenement</button>
            </Link>
            <button onClick={event => modifAffichage(event)} name='enclos'>
              Enclos
            </button>
            <button onClick={event => modifAffichage(event)} name='especes'>
              Especes
            </button>
            <button onClick={event => modifAffichage(event)} name='animaux'>
              Animaux
            </button>
          </nav>
        </>
      )}
    </>
  )
}
