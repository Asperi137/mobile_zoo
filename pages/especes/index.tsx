import Enclos from '../../Types/Enclos'
import Especes from '../../Types/Especes'
import Link from 'next/link'

const API_adr = process.env.API_adr

type Props = { enclos: Enclos[]; especes: Especes[] }

export default function Index ({ enclos, especes }: Props): JSX.Element {
  return (
    <ul>
      {enclos.map((enclos: Enclos) => (
        <ul key={enclos._id}>
          <li>
            {' '}
            {`enclos ${enclos._id}`}
            <ul>
              {especes.map(
                (especes: Especes) =>
                  especes.enclos === enclos._id && (
                    <li key={especes._id}>
                      <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                        {`especes ${especes._id}`}
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
  const especes: Especes[] = await fetch(`${API_adr}especes`).then(res =>
    res.json()
  )
  const enclos: Enclos[] = await fetch(`${API_adr}enclos`).then(res =>
    res.json()
  )
  return {
    props: {
      enclos,
      especes
    }
  }
}
