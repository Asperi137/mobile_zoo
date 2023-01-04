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
import TableauEvent, { tri } from 'components/ui/TableauEvent/TableauEvent'
import Evenements from 'Types/Evenements'
import apiConnect from 'lib/apiConnect'

type props = {
  animaux: Animaux[]
  espece: Especes
  enclos: Enclos
  zone: Zones
  event: Evenements[]
}

export default function Index ({
  animaux,
  espece,
  enclos,
  zone,
  event
}: props): JSX.Element {
  return (
    <div className='containerV'>
      {IsConnected() && (
        <>
          <button className='btnRetour,alignCenter'>
            <Link
              href={`/enclos/${espece.enclos}`}
              as={`/enclos/${espece.enclos}`}
            >
              {`retour à l'enclos : ${enclos.nom} `}
            </Link>
          </button>
          <h2 className='alignCenter'>{espece.nom}</h2>
          <div className='alignCenter'>
            {animaux.map(
              (animal: Animaux) =>
                animal.espece === espece._id && (
                  <button>
                    <Link href='/animaux/[id]' as={`/animaux/${animal._id}`}>
                      {`${animal.nom}`}
                    </Link>
                  </button>
                )
            )}
          </div>
          <BoutonAction cible={espece._id} action={'nourrir'} />
          <BoutonAction cible={espece._id} action={'stimuler'} />
          <div className='alignCenter'>
            <InfoEnclos enclos={enclos} zone={zone} />
            <InfoEspece espece={espece} />
          </div>{' '}
          <div className='alignCenter'>
            <details className='bordered'>
              <summary> {`Evenements`}</summary>
              <TableauEvent affichage={event} pageEvent='especes' />
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

  const espece = await fetch(
    `${apiConnect()}especes/${params.id}`,
    options
  ).then(res => res.json())
  const enclos: Enclos = await fetch(
    `${apiConnect()}enclos/${espece.enclos}`,
    options
  ).then(res => res.json())
  const zone: Zones = await fetch(
    `${apiConnect()}zones/${enclos.zone}`,
    options
  ).then(res => res.json())
  const animaux = await fetch(`${apiConnect()}animaux`, options).then(res =>
    res.json()
  )
  const event = tri(
    await fetch(`${apiConnect()}evenements/especes/${params.id}`, options).then(
      res => res.json()
    )
  )
  return {
    props: {
      animaux,
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

  const especes: Especes[] = await fetch(
    `${apiConnect()}especes`,
    options
  ).then(res => res.json())

  const paths = especes.map(espece => ({
    params: { id: espece._id }
  }))

  return { paths, fallback: false }
}
