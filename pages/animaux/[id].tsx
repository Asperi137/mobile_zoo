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
import { withSessionSsr } from 'lib/withSession'
import User from 'Types/User'
import apiConnect from 'lib/apiConnect'

type props = {
  animal: Animaux
  espece: Especes
  enclos: Enclos
  zone: Zones
  user: User
  headers: Headers
}

export default function Index ({
  animal,
  espece,
  enclos,
  zone,
  user,
  headers
}: props): JSX.Element {
  const [position, setPosition] = useState(animal.position)

  return (
    <div className='containerV'>
      {IsConnected(user) && (
        <>
          <button className='btnRetour,alignCenter'>
            <Link href={`/especes/${espece._id}`} as={`/especes/${espece._id}`}>
              {`retour à l'especes : ${espece.nom} `}
            </Link>
          </button>
          <h2 className='alignCenter'>{animal.nom}</h2>

          {(IsConnected(user) === 'veterinaire' ||
            IsConnected(user) === 'admin') && (
            <BoutonAction
              headers={headers}
              cible={animal._id}
              action={'soigner'}
            />
          )}
          <BoutonEntrerSortir
            headers={headers}
            cible={animal._id}
            position={position}
            setPosition={setPosition}
          />
        </>
      )}
      {!IsConnected(user) && (
        <button className='btnRetour'>
          <Link href='/'>Veillez vous connecter</Link>
        </button>
      )}
      <div className='alignCenter'>
        <InfoAnimal animal={animal} position={position} />
        <InfoEspece espece={espece} />
        <InfoEnclos enclos={enclos} zone={zone} />
      </div>
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ params, req }: Params) {
    const headers = req.headers
    const user = req.session.user
    const animal = await fetch(`${apiConnect()}animaux/${params.id}`, {
      headers
    }).then(res => res.json())
    const espece = await fetch(`${apiConnect()}especes/${animal.espece}`, {
      headers
    }).then(res => res.json())
    const enclos = await fetch(`${apiConnect()}enclos/${espece.enclos}`, {
      headers
    }).then(res => res.json())
    const zone = await fetch(`${apiConnect()}zones/${enclos.zone}`, {
      headers
    }).then(res => res.json())

    return {
      props: {
        animal,
        espece,
        enclos,
        zone,
        user,
        headers
      }
    }
  }
)
