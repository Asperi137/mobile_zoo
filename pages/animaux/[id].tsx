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
import TableauEvent, { tri } from 'components/ui/TableauEvent/TableauEvent'
const API_adr = process.env.API_adr

type props = {
  animal: Animaux
  espece: Especes
  enclos: Enclos
  zone: Zones
  event: Evenements[]
  API_adr: string
}

export default function Index ({
  animal,
  espece,
  enclos,
  zone,
  event,
  API_adr
}: props): JSX.Element {
  const [position, setPosition] = useState(animal.position)

  return (
    <div className='containerV'>
      {IsConnected() && (
        <>
          <button className='btnRetour'>
            <Link href={`/especes/${espece._id}`} as={`/especes/${espece._id}`}>
              {`retour à l'especes : ${espece.nom} `}
            </Link>
          </button>

          <div className='containerV'>
            <div className='containerH'>
              <h2 className='alignCenter'>{animal.nom}</h2>
              <InfoAnimal animal={animal} position={position} />
              <InfoEspece espece={espece} />
              <InfoEnclos enclos={enclos} zone={zone} />
            </div>
            {(IsConnected() === 'veterinaire' || IsConnected() === 'admin') && (
              <BoutonAction
                cible={animal._id}
                action={'soigner'}
                API_adr={API_adr}
              />
            )}
            <BoutonEntrerSortir
              cible={animal._id}
              API_adr={API_adr}
              position={position}
              setPosition={setPosition}
            />
          </div>
          <TableauEvent affichage={event} />
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

export async function getServerSideProps ({ params }: Params) {
  const animal = await fetch(`${API_adr}animaux/${params.id}`).then(res =>
    res.json()
  )
  const espece = await fetch(`${API_adr}especes/${animal.espece}`).then(res =>
    res.json()
  )
  const enclos = await fetch(`${API_adr}enclos/${espece.enclos}`).then(res =>
    res.json()
  )
  const zone = await fetch(`${API_adr}zones/${enclos.zone}`).then(res =>
    res.json()
  )
  const event = tri(
    await fetch(`${API_adr}evenements/animaux/${params.id}`).then(res =>
      res.json()
    )
  )

  return {
    props: {
      animal,
      espece,
      enclos,
      zone,
      event,
      API_adr
    }
  }
}
