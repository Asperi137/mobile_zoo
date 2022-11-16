import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Animaux from '../../Types/Animaux'
import Especes from '../../Types/Especes'
import Enclos from '../../Types/Enclos'
import Zones from '../../Types/Zones'
import InfoEspece from '../../components/ui/barreInfo/InfoEspece'
import InfoEnclos from '../../components/ui/barreInfo/InfoEnclos'
const API_adr = process.env.API_adr

type props = { animaux: Animaux; espece: Especes; enclos: Enclos; zone: Zones }

export default function Index ({
  animaux,
  espece,
  enclos,
  zone
}: props): JSX.Element {
  return (
    <div className='containerV'>
      <button className='btnRetour'>
        <Link href={`/especes/${espece._id}`} as={`/especes/${espece._id}`}>
          {`retour à l'especes : ${espece.nom} `}
        </Link>
      </button>

      <InfoEnclos enclos={enclos} zone={zone} />
      <InfoEspece enclos={enclos} espece={espece} />
      {animaux.nom}
    </div>
  )
}

export async function getServerSideProps ({ params }: Params) {
  const animaux = await fetch(`${API_adr}animaux/${params.id}`).then(res =>
    res.json()
  )
  const espece = await fetch(`${API_adr}especes/${animaux.espece}`).then(res =>
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
      animaux,
      espece,
      enclos,
      zone
    }
  }
}
