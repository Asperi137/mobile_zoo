import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import Enclos from 'Types/Enclos'
import Especes from 'Types/Especes'
import Zones from 'Types/Zones'
import IsConnected from 'lib/isConnected'
import BoutonAction from 'components/ui/boutonAction/BoutonAction'
import apiConnect from 'lib/apiConnect'
import TableauEvent, { tri } from 'components/ui/TableauEvent/TableauEvent'
import Evenements from 'Types/Evenements'

type props = {
  enclos: Enclos
  especeslst: Especes[]
  zone: Zones
  event: Evenements[]
}

export default function Index ({
  enclos,
  especeslst,
  zone,
  event
}: props): JSX.Element {
  return (
    <div className='containerV'>
      {IsConnected() && (
        <>
          <button className='btnRetour,alignCenter'>
            <Link href={`/enclos`} as={`/enclos`}>
              {`retour à la liste des enclos `}
            </Link>
          </button>
          <h2 className='alignCenter'>{enclos.nom}</h2>

          <div className='alignCenter'>
            {especeslst.map(
              (especes: Especes) =>
                especes.enclos === enclos._id && (
                  <button key={especes._id}>
                    <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                      {`${especes.nom}`}
                    </Link>
                  </button>
                )
            )}
          </div>

          {(IsConnected() === 'veterinaire' ||
            IsConnected() === 'responssableZone' ||
            IsConnected() === 'admin') && (
            <BoutonAction cible={enclos._id} action={'verifier'} />
          )}
          <div className='alignCenter'>
            <InfoEnclos enclos={enclos} zone={zone} />
          </div>
          <div className='alignCenter'>
            <details className='bordered'>
              <summary> {`Evenements`}</summary>
              <TableauEvent affichage={event} pageEvent={'enclos'} />
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

  const especeslst = await fetch(`${apiConnect()}especes`, options).then(res =>
    res.json()
  )

  const enclos = await fetch(
    `${apiConnect()}enclos/${params.id}`,
    options
  ).then(res => res.json())

  const zone = await fetch(`${apiConnect()}zones/${enclos.zone}`, options).then(
    res => res.json()
  )
  const event = tri(
    await fetch(`${apiConnect()}evenements/enclos/${params.id}`, options).then(
      res => res.json()
    )
  )
  return {
    props: {
      enclos,
      especeslst,
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

  const encloslst: Enclos[] = await fetch(
    `${apiConnect()}enclos`,
    options
  ).then(res => res.json())

  const paths = encloslst.map(enclos => ({
    params: { id: enclos._id }
  }))

  return { paths, fallback: false }
}
