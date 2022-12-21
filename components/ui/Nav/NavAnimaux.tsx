import classes from './Nav.module.css'
import Link from 'next/link'
import apiConnect from 'lib/apiConnect'
import { useEffect, useState } from 'react'
import Animaux from 'Types/Animaux'

export default function NavEspeces () {
  const [animauxlst, setanimauxlst] = useState<Animaux[]>([])

  useEffect(() => {
    const animauxFetch = async () => {
      const animauxlst: Animaux[] = await (
        await fetch(`${apiConnect()}animaux`)
      ).json()
      animauxlst.sort((a, b) => a.nom.localeCompare(b.nom))
      setanimauxlst(animauxlst)
    }
    animauxFetch()
  }, [])

  return (
    <>
      <div className={classes.lstV}>
        <Link href={`/animaux`}>Tous</Link>
        <br />
        {animauxlst.map(animal => (
          <Link key={animal._id} href={`/animaux/${animal._id}`}>
            {animal.nom}
          </Link>
        ))}
      </div>
    </>
  )
}
