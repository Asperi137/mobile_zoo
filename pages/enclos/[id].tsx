import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import Enclos from 'Types/Enclos'
import Especes from 'Types/Especes'
import Zones from 'Types/Zones'
import IsConnected from 'lib/isConnected'
const API_adr = process.env.API_adr

type props = { enclos: Enclos; especeslst: Especes[]; zone: Zones }

export default function Index ({
  enclos,
  especeslst,
  zone
}: props): JSX.Element {
  return (
    <div className='containerV'>
      {IsConnected() && (
        <>
          <button className='btnRetour'>
            <Link href={`/enclos`} as={`/enclos`}>
              {`retour à la liste des enclos `}
            </Link>
          </button>
          <InfoEnclos enclos={enclos} zone={zone} />
          <div className='containerH'>
            {especeslst.map(
              (especes: Especes) =>
                especes.enclos === enclos._id && (
                  <div className='containerV , bordered' key={especes._id}>
                    <button>
                      <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                        {`${especes.nom}`}
                      </Link>
                    </button>
                  </div>
                )
            )}
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
