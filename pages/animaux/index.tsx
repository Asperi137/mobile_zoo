import Especes from 'Types/Especes'
import Link from 'next/link'
import Animaux from 'Types/Animaux'
import IsConnected from 'lib/isConnected'
import apiConnect from 'lib/apiConnect'

type Props = {
  animaux: Animaux[]
  especes: Especes[]
}

export default function Index ({ animaux, especes }: Props): JSX.Element {
  animaux.sort((a, b) => a.nom.localeCompare(b.nom))
  especes.sort((a, b) => a.nom.localeCompare(b.nom))
  return (
    <div className='containerV'>
      {IsConnected() &&
        especes.map((espece: Especes) => (
          <div key={espece._id} className='containerV , alignCenter , bordered'>
            <Link href='/especes/[id]' as={`/especes/${espece._id}`}>
              <h2 className='description'>{`${espece.nom}`}</h2>
            </Link>
            <div>
              {animaux.map(
                (animal: Animaux) =>
                  animal.espece === espece._id && (
                    <button key={animal._id}>
                      <Link href='/animaux/[id]' as={`/animaux/${animal._id}`}>
                        {`${animal.nom}`}
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

export async function getStaticProps () {
  const options: RequestInit = {
    credentials: 'include'
  }

  const especes: Especes[] = await fetch(
    `${apiConnect()}especes`,
    options
  ).then(res => res.json())
  const animaux: Animaux[] = await fetch(
    `${apiConnect()}animaux`,
    options
  ).then(res => res.json())
  return {
    props: {
      animaux,
      especes
    },
    revalidate: 10
  }
}
