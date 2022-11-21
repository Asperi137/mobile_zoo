import Especes from 'Types/Especes'
import Link from 'next/link'
import Animaux from 'Types/Animaux'
import IsConnected from 'lib/isConnected'

const API_adr = process.env.API_adr

type Props = { animaux: Animaux[]; especes: Especes[] }

export default function Index ({ animaux, especes }: Props): JSX.Element {
  return (
    <div className='containerH'>
      {IsConnected() &&
        especes.map((espece: Especes) => (
          <div key={espece._id} className='containerV , alignCenter , bordered'>
            <Link href='/especes/[id]' as={`/especes/${espece._id}`}>
              <h2 className='description'>{`${espece.nom}`}</h2>
            </Link>
            <div className='containerV'>
              {animaux.map(
                (animal: Animaux) =>
                  animal.espece === espece._id && (
                    <button key={animal._id}>
                      <Link href='/animaux/[id]' as={`/animaux/${animal._id}`}>
                        {`${animal._id}`}
                      </Link>
                    </button>
                  )
              )}
            </div>
          </div>
        ))}
      {!IsConnected() && (
        <button className='btnRetour'>
          <Link href='/'>Veillez vous connecter</Link>
        </button>
      )}
    </div>
  )
}

export async function getServerSideProps () {
  const especes: Especes[] = await fetch(`${API_adr}especes`).then(res =>
    res.json()
  )
  const animaux: Animaux[] = await fetch(`${API_adr}animaux`).then(res =>
    res.json()
  )
  return {
    props: {
      animaux,
      especes
    }
  }
}
