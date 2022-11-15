import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Animaux from '../../Types/Animaux'
import Especes from '../../Types/Especes'

const API_adr = process.env.API_adr

type props = { animaux: Animaux[]; especes: Especes }

export default function Index ({ animaux, especes }: props): JSX.Element {
  return (
    <>
      <ul>
        <li>{`Id ${especes._id}`}</li>
        <li>{`nom ${especes.nom}`}</li>
        <li>
          <Link
            href={`/enclos/${especes.enclos}`}
            as={`/enclos/${especes.enclos}`}
          >
            {`enclos ${especes.enclos}`}
          </Link>
        </li>
        <li>{`sociable ${especes.sociable}`}</li>
        <li>{`dangereux ${especes.dangereux}`}</li>
        <li>{`observations ${especes.observations}`}</li>
      </ul>
      <ul>
        {animaux.map(
          (animaux: Animaux) =>
            animaux.espece === especes._id && (
              <li key={especes._id}>
                <Link href='/animaux/[id]' as={`/animaux/${animaux._id}`}>
                  {`animaux ${animaux._id}`}
                </Link>
              </li>
            )
        )}
      </ul>
    </>
  )
}

export async function getServerSideProps ({ params }: Params) {
  const especes = await fetch(`${API_adr}especes/${params.id}`).then(res =>
    res.json()
  )
  const animaux = await fetch(`${API_adr}animaux`).then(res => res.json())
  return {
    props: {
      animaux,
      especes
    }
  }
}
