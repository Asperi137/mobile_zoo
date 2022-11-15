import Enclos from '../../Types/Enclos'
import Especes from '../../Types/Especes'
import Link from 'next/link'

const API_adr = process.env.API_adr

type Props = { enclos: Enclos[]; especes: Especes[] }

export default function Index ({ enclos, especes }: Props): JSX.Element {
  return (
    <div className='containerH'>
      {enclos.map((enclos: Enclos) => (
        <div key={enclos._id} className='containerV , alignCenter , bordered'>
          <Link href='/enclos/[id]' as={`/enclos/${enclos._id}`}>
            <h2 className='description'>{`${enclos.nom}`}</h2>
          </Link>
          <div className='containerV'>
            {especes.map(
              (especes: Especes) =>
                especes.enclos === enclos._id && (
                  <button key={especes._id}>
                    <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                      {`especes ${especes._id}`}
                    </Link>
                  </button>
                )
            )}
          </div>
        </div>
      ))}{' '}
    </div>
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
