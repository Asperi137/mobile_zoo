import Enclos from 'Types/Enclos'
import Especes from 'Types/Especes'
import Link from 'next/link'
import IsConnected from 'lib/isConnected'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { withSessionSsr } from 'lib/withSession'
import User from 'Types/User'
import apiConnect from 'lib/apiConnect'

type Props = {
  enclos: Enclos[]
  especes: Especes[]
  user: User
}

export default function Index ({ enclos, especes, user }: Props): JSX.Element {
  enclos.sort((a, b) => a.nom.localeCompare(b.nom))
  especes.sort((a, b) => a.nom.localeCompare(b.nom))
  return (
    <div className='containerV'>
      {IsConnected(user) &&
        enclos.map((enclos: Enclos) => (
          <div key={enclos._id} className='containerV , alignCenter , bordered'>
            <Link href='/enclos/[id]' as={`/enclos/${enclos._id}`}>
              <h2 className='description'>{`${enclos.nom}`}</h2>
            </Link>
            <div>
              {especes.map(
                (especes: Especes) =>
                  especes.enclos === enclos._id && (
                    <button key={especes._id}>
                      <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                        {` ${especes.nom}`}
                      </Link>
                    </button>
                  )
              )}
            </div>
          </div>
        ))}
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
    const especes: Especes[] = await fetch(`${apiConnect()}especes`, {
      headers
    }).then(res => res.json())
    const enclos: Enclos[] = await fetch(`${apiConnect()}enclos`, {
      headers
    }).then(res => res.json())
    return {
      props: {
        enclos,
        especes,
        user
      }
    }
  }
)
