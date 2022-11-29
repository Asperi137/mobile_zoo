import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Animaux from 'Types/Animaux'
import Especes from 'Types/Especes'
import Enclos from 'Types/Enclos'
import Zones from 'Types/Zones'
import InfoEspece from 'components/ui/barreInfo/InfoEspece'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import IsConnected from 'lib/isConnected'
import BoutonAction from 'components/ui/boutonAction/BoutonAction'
const API_adr = process.env.API_adr

type props = {
  animal: Animaux
  espece: Especes
  enclos: Enclos
  zone: Zones
  API_adr: string
}

export default function Index ({
  animal,
  espece,
  enclos,
  zone,
  API_adr
}: props): JSX.Element {
  return (
    <div className='containerV'>
      {IsConnected() && (
        <>
          <button className='btnRetour'>
            <Link href={`/especes/${espece._id}`} as={`/especes/${espece._id}`}>
              {`retour à l'especes : ${espece.nom} `}
            </Link>
          </button>
          <h2 className='alignCenter'>{animal.nom}</h2>

          {(IsConnected() === 'veterinaire' || IsConnected() === 'admin') && (
            <BoutonAction
              cible={animal._id}
              action={'soigner'}
              API_adr={API_adr}
            />
          )}
          <InfoEnclos enclos={enclos} zone={zone} />
          <InfoEspece enclos={enclos} espece={espece} />
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
  const animal = await fetch(`${API_adr}animaux/${params.id}`).then(res =>
    res.json()
  )
  const espece = await fetch(`${API_adr}especes/${animal.espece}`).then(res =>
    res.json()
  )
  const enclos = await fetch(`${API_adr}enclos/${espece.enclos}`).then(res =>
    res.json()
  )
  const zone = await fetch(`${API_adr}zones/${enclos.zone}`).then(res =>
    res.json()
  )

  return {
    props: {
      animal,
      espece,
      enclos,
      zone,
      API_adr
    }
  }
}
