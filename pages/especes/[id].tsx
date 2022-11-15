import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Animaux from '../../Types/Animaux'
import Especes from '../../Types/Especes'
import Enclos from '../../Types/Enclos'

const API_adr = process.env.API_adr

type props = { animaux: Animaux[]; espece: Especes; enclos: Enclos }
function isSociable (espece: Especes) {
  if (espece.sociable) return 'sociable'
  else return 'non sociable'
}
function isDanger (espece: Especes) {
  if (espece.sociable) return 'dangereux'
  else return 'inoffensif'
}

export default function Index ({
  animaux,
  espece,
  enclos
}: props): JSX.Element {
  return (
    <div className='containerV'>
      <button className='btnRetour'>
        <Link href={`/enclos/${espece.enclos}`} as={`/enclos/${espece.enclos}`}>
          {`retour à l'enclos : ${enclos.nom} `}
        </Link>
      </button>
      <div className='containerV , description , bordered'>
        {`${espece.nom}`}
        <br />
        {`${enclos.nom}`}
        <br />
        {`${isSociable(espece)} `}
        <br />
        {`${isDanger(espece)}`}
        <br />
        {`${espece.observations}`}
      </div>
      <div className='containerH'>
        {animaux.map(
          (animal: Animaux) =>
            animal.espece === espece._id && (
              <div className='containerV , bordered' key={animal._id}>
                <button>
                  <Link href='/animaux/[id]' as={`/animaux/${animal._id}`}>
                    {`${animal._id}`}
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
  const espece = await fetch(`${API_adr}especes/${params.id}`).then(res =>
    res.json()
  )
  const enclos = await fetch(`${API_adr}enclos/${espece.enclos}`).then(res =>
    res.json()
  )
  const animaux = await fetch(`${API_adr}animaux`).then(res => res.json())
  return {
    props: {
      animaux,
      espece,
      enclos
    }
  }
}
