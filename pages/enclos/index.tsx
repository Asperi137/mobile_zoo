import Enclos from '../../Types/Enclos'
import Zones from '../../Types/Zones'
import Link from 'next/link'

type Props = { enclos: Enclos[]; zones: Zones[] }

const API_adr = process.env.API_adr

export default function Index ({ enclos, zones }: Props): JSX.Element {
  return (
    <div className='containerH'>
      {zones.map((zone: Zones) => (
        <div key={zone._id} className='containerV , alignCenter , bordered'>
          <h2 className='description'>{`${zone.nom}`}</h2>
          <div className='containerV'>
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
    </div>
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
