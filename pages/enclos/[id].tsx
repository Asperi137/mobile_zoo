import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import Enclos from 'Types/Enclos'
import Especes from 'Types/Especes'
import Zones from 'Types/Zones'
import IsConnected from 'lib/isConnected'
import BoutonAction from 'components/ui/boutonAction/BoutonAction'
import { withSessionSsr } from 'lib/withSession'
import User from 'Types/User'
import apiConnect from 'lib/apiConnect'
import TableauEvent, { tri } from 'components/ui/TableauEvent/TableauEvent'
import Evenements from 'Types/Evenements'

type props = {
  enclos: Enclos
  especeslst: Especes[]
  zone: Zones
  event: Evenements[]
  user: User
  headers: Headers
}

export default function Index ({
  enclos,
  especeslst,
  zone,
  event,
  user,
  headers
}: props): JSX.Element {
  return (
    <div className='containerV'>
      {IsConnected(user) && (
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
                  <button>
                    <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                      {`${especes.nom}`}
                    </Link>
                  </button>
                )
            )}
          </div>

          {(IsConnected(user) === 'veterinaire' ||
            IsConnected(user) === 'responssableZone' ||
            IsConnected(user) === 'admin') && (
            <BoutonAction
              cible={enclos._id}
              action={'verifier'}
              headers={headers}
            />
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
      {!IsConnected(user) && (
        <button className='btnRetour'>
          <Link href='/'>Veillez vous connecter</Link>
        </button>
      )}
    </div>
  )
}
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ params, req }: Params) {
    const headers = req.headers
    const user = req.session.user
    const especeslst = await fetch(`${apiConnect()}especes`, { headers }).then(
      res => res.json()
    )

    const enclos = await fetch(`${apiConnect()}enclos/${params.id}`, {
      headers
    }).then(res => res.json())

    const zone = await fetch(`${apiConnect()}zones/${enclos.zone}`, {
      headers
    }).then(res => res.json())
    const event = tri(
      await fetch(`${apiConnect()}evenements/enclos/${params.id}`, {
        headers
      }).then(res => res.json())
    )
    return {
      props: {
        enclos,
        especeslst,
        zone,
        event,
        user,
        headers
      }
    }
  }
)
