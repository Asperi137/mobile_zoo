import Enclos from 'Types/Enclos'
import Especes from 'Types/Especes'
import Link from 'next/link'
import IsConnected from 'lib/isConnected'
import apiConnect from 'lib/apiConnect'

type Props = {
  enclos: Enclos[]
  especes: Especes[]
}

export default function Index ({ enclos, especes }: Props): JSX.Element {
  enclos.sort((a, b) => a.nom.localeCompare(b.nom))
  especes.sort((a, b) => a.nom.localeCompare(b.nom))
  return (
    <div className='containerV'>
      {IsConnected() &&
        enclos.map((enclos: Enclos) => (
          <div key={enclos._id} className='containerV , alignCenter , bordered'>
            <Link href='/enclos/[id]' as={`/enclos/${enclos._id}`}>
              <h2 className='description'>{`${enclos.nom}`}</h2>
            </Link>
            <div>
              {especes.map(
                (especes: Especes) =>
                  especes.enclos === enclos._id && (
                    <button key={especes._id}>
                      <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                        {` ${especes.nom}`}
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
  const enclos: Enclos[] = await fetch(`${apiConnect()}enclos`, options).then(
    res => res.json()
  )
  return {
    props: {
      enclos,
      especes
    },
    revalidate: 10
  }
}
