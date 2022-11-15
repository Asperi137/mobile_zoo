import Enclos from '../../Types/Enclos'
import Zones from '../../Types/Zones'
import Link from 'next/link'

type Props = { enclos: Enclos[]; zones: Zones[] }

const API_adr = process.env.API_adr

export default function Index ({ enclos, zones }: Props): JSX.Element {
  return (
    <ul>
      {zones.map((zone: Zones) => (
        <ul key={zone._id}>
          <li>
            {' '}
            {`zone ${zone._id}`}
            <ul>
              {enclos.map(
                (enclos: Enclos) =>
                  enclos.zone === zone._id && (
                    <li key={enclos._id}>
                      <Link href='/enclos/[id]' as={`/enclos/${enclos._id}`}>
                        {`enclos ${enclos._id}`}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </li>
        </ul>
      ))}
    </ul>
  )
}

export async function getServerSideProps () {
  const zones: Zones[] = await fetch(`${API_adr}zones`).then(res => res.json())
  const enclos: Enclos[] = await fetch(`${API_adr}enclos`).then(res =>
    res.json()
  )
  return {
    props: {
      enclos,
      zones
    }
  }
}
