import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Enclos from '../../Types/Enclos'
import Especes from '../../Types/Especes'
const API_adr = process.env.API_adr

type props = { enclos: Enclos; especeslst: Especes[] }

export default function Index ({ enclos, especeslst }: props): JSX.Element {
  return (
    <>
      <ul>
        <li>{`Enclos ${enclos._id}`}</li>
        <li>{`nom ${enclos.nom}`}</li>
        <li>{`zone ${enclos.zone}`}</li>
        <li>{`coordonnées ${enclos.coordonnées}`}</li>
        <li>{`superficie ${enclos.superficie}`}</li>
      </ul>
      <ul>
        {especeslst.map(
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
    </>
  )
}

export async function getServerSideProps ({ params }: Params) {
  const especeslst = await fetch(`${API_adr}especes`).then(res => res.json())
  const enclos = await fetch(`${API_adr}enclos/${params.id}`).then(res =>
    res.json()
  )
  return {
    props: {
      enclos,
      especeslst
    }
  }
}
