import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Animaux from 'Types/Animaux'
import Especes from 'Types/Especes'
import Enclos from 'Types/Enclos'
import Zones from 'Types/Zones'
import InfoEspece from 'components/ui/barreInfo/InfoEspece'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import IsConnected from 'lib/isConnected'
import BoutonAction from 'components/ui/boutonAction/BoutonAction'
import InfoAnimal from 'components/ui/barreInfo/InfoAnimal'
import { useState } from 'react'
import BoutonEntrerSortir from 'components/ui/boutonAction/BoutonEntrerSortir'
import Evenements from 'Types/Evenements'
import apiConnect from 'lib/apiConnect'
import TableauEvent, { tri } from 'components/ui/TableauEvent/TableauEvent'

type props = {
  animal: Animaux
  espece: Especes
  enclos: Enclos
  zone: Zones
  event: Evenements[]
}

export default function Index ({
  animal,
  espece,
  enclos,
  zone,
  event
}: props): JSX.Element {
  const [position, setPosition] = useState(animal.position)

  return (
    <div className='containerV'>
      {IsConnected() && (
        <>
          <button className='btnRetour,alignCenter'>
            <Link href={`/especes/${espece._id}`} as={`/especes/${espece._id}`}>
              {`retour à l'especes : ${espece.nom} `}
            </Link>
          </button>
          <h2 className='alignCenter'>{animal.nom}</h2>

          {(IsConnected() === 'veterinaire' || IsConnected() === 'admin') && (
            <BoutonAction cible={animal._id} action={'soigner'} />
          )}
          <BoutonEntrerSortir
            cible={animal._id}
            position={position}
            setPosition={setPosition}
          />
          <div className='alignCenter'>
            <InfoAnimal animal={animal} position={position} />
            <InfoEspece espece={espece} />
            <InfoEnclos enclos={enclos} zone={zone} />
          </div>
          <div className='alignCenter'>
            <details className='bordered'>
              <summary> {`Evenements`}</summary>
              <TableauEvent affichage={event} pageEvent={'animal'} />
            </details>
          </div>
        </>
      )}
      {!IsConnected() && (
        <button className='btnRetour'>
          <Link href='/'>Veillez vous connecter</Link>
        </button>
      )}
    </div>
  )
}

export async function getStaticProps ({ params }: Params) {
  const options: RequestInit = {
    credentials: 'include'
  }

  const animal = await fetch(
    `${apiConnect()}animaux/${params.id}`,
    options
  ).then(res => res.json())
  const espece = await fetch(
    `${apiConnect()}especes/${animal.espece}`,
    options
  ).then(res => res.json())
  const enclos = await fetch(
    `${apiConnect()}enclos/${espece.enclos}`,
    options
  ).then(res => res.json())
  const zone = await fetch(`${apiConnect()}zones/${enclos.zone}`, options).then(
    res => res.json()
  )
  const event = tri(
    await fetch(`${apiConnect()}evenements/animaux/${params.id}`, options).then(
      res => res.json()
    )
  )

  return {
    props: {
      animal,
      espece,
      enclos,
      zone,
      event
    },
    revalidate: 10
  }
}

export async function getStaticPaths () {
  const options: RequestInit = {
    credentials: 'include'
  }

  const animaux: Animaux[] = await fetch(
    `${apiConnect()}animaux`,
    options
  ).then(res => res.json())

  const paths = animaux.map(animal => ({
    params: { id: animal._id }
  }))

  return { paths, fallback: false }
}
