import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Enclos from '../../Types/Enclos'
import Especes from '../../Types/Especes'
import Zones from '../../Types/Zones'
const API_adr = process.env.API_adr

type props = { enclos: Enclos; especeslst: Especes[]; zone: Zones }

export default function Index ({
  enclos,
  especeslst,
  zone
}: props): JSX.Element {
  return (
    <div className='containerV'>
      <button className='btnRetour'>
        <Link href={`/enclos`} as={`/enclos`}>
          {`retour à la liste des enclos `}
        </Link>
      </button>
      <div className='containerV , description , bordered'>
        {`${enclos.nom}`}
        <br />
        {`${zone.nom}`}
        <br />
        {`superficie : ${enclos.superficie} m²`}
        <br />
        {`${enclos.coordonnées}`}
        <br />
      </div>
      <div className='containerH'>
        {especeslst.map(
          (especes: Especes) =>
            especes.enclos === enclos._id && (
              <div className='containerV , bordered' key={especes._id}>
                <button>
                  <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                    {`${especes._id}`}
                  </Link>
                </button>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps ({ params }: Params) {
  const especeslst = await fetch(`${API_adr}especes`).then(res => res.json())
  const enclos = await fetch(`${API_adr}enclos/${params.id}`).then(res =>
    res.json()
  )
  const zone = await fetch(`${API_adr}zones/${enclos.zone}`).then(res =>
    res.json()
  )
  return {
    props: {
      enclos,
      especeslst,
      zone
    }
  }
}
