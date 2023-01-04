import Enclos from 'Types/Enclos'
import Zones from 'Types/Zones'
import Link from 'next/link'
import IsConnected from 'lib/isConnected'
import apiConnect from 'lib/apiConnect'

type Props = {
  enclos: Enclos[]
  zones: Zones[]
}

export default function Index ({ enclos, zones }: Props): JSX.Element {
  enclos.sort((a, b) => a.nom.localeCompare(b.nom))
  zones.sort((a, b) => a.nom.localeCompare(b.nom))

  return (
    <div className='containerV'>
      {IsConnected() &&
        zones.map((zone: Zones) => (
          <div key={zone._id} className='containerV , alignCenter , bordered'>
            <h2 className='description'>{`${zone.nom}`}</h2>
            <div>
              {enclos.map(
                (enclos: Enclos) =>
                  enclos.zone === zone._id && (
                    <button key={enclos._id}>
                      <Link href='/enclos/[id]' as={`/enclos/${enclos._id}`}>
                        {`${enclos.nom}`}
                      </Link>
                    </button>
                  )
              )}
            </div>
          </div>
        ))}
      {!IsConnected() && (
        <button className='btnRetour'>
          <Link href='/'>Veillez vous connecter</Link>
        </button>
      )}
    </div>
  )
}

export async function getStaticProps () {
  const options: RequestInit = {
    credentials: 'include'
  }

  const zones: Zones[] = await fetch(`${apiConnect()}zones/`, options).then(
    res => res.json()
  )
  const enclos: Enclos[] = await fetch(`${apiConnect()}enclos/`, options).then(
    res => res.json()
  )
  return {
    props: {
      enclos,
      zones
    },
    revalidate: 10
  }
}
