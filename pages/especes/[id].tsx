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
  animaux: Animaux[]
  espece: Especes
  enclos: Enclos
  zone: Zones
  API_adr: string
}

export default function Index ({
  animaux,
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
            <Link
              href={`/enclos/${espece.enclos}`}
              as={`/enclos/${espece.enclos}`}
            >
              {`retour à l'enclos : ${enclos.nom} `}
            </Link>
          </button>
          <h2 className='alignCenter'>{espece.nom}</h2>
          <div className='containerV'>
            <BoutonAction
              cible={espece._id}
              action={'nourrir'}
              API_adr={API_adr}
            />
            <BoutonAction
              cible={espece._id}
              action={'stimuler'}
              API_adr={API_adr}
            />
            <InfoEnclos enclos={enclos} zone={zone} />
            <InfoEspece espece={espece} />
          </div>
          <div className='containerH'>
            {animaux.map(
              (animal: Animaux) =>
                animal.espece === espece._id && (
                  <div className='containerV , bordered' key={animal._id}>
                    <button>
                      <Link href='/animaux/[id]' as={`/animaux/${animal._id}`}>
                        {`${animal.nom}`}
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
  const espece = await fetch(`${API_adr}especes/${params.id}`).then(res =>
    res.json()
  )
  const enclos: Enclos = await fetch(`${API_adr}enclos/${espece.enclos}`).then(
    res => res.json()
  )
  const zone: Zones = await fetch(`${API_adr}zones/${enclos.zone}`).then(res =>
    res.json()
  )
  const animaux = await fetch(`${API_adr}animaux`).then(res => res.json())
  return {
    props: {
      animaux,
      espece,
      enclos,
      zone,
      API_adr
    }
  }
}
