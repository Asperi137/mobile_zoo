import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Animaux from 'Types/Animaux'
import Especes from 'Types/Especes'
import Enclos from 'Types/Enclos'
import Zones from 'Types/Zones'
import InfoEspece from 'components/ui/barreInfo/InfoEspece'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import IsConnected from 'lib/isConnected'
import { useContext } from 'react'
import { UserContext } from 'lib/UserContext'

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
  const { role } = useContext(UserContext)

  function nourrir () {
    const data = {
      espece: espece._id,
      createur: role
    }
    const JSONdata = JSON.stringify(data)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata
    }
    fetch(`${API_adr}especes/nourrir`, options)
  }

  function stimuler () {
    const data = {
      espece: espece._id,
      createur: role
    }
    const JSONdata = JSON.stringify(data)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata
    }
    fetch(`${API_adr}especes/stimuler`, options)
  }

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
          <div className='containerH'>
            <div className='containerV'>
              <button onClick={nourrir}>Nourrir</button>
              <button onClick={stimuler}>Stimuler</button>
            </div>
            <InfoEnclos enclos={enclos} zone={zone} />
            <InfoEspece enclos={enclos} espece={espece} />
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
