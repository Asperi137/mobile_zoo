import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import Animaux from 'Types/Animaux'
import Especes from 'Types/Especes'
import Enclos from 'Types/Enclos'
import Zones from 'Types/Zones'
import InfoEspece from 'components/ui/barreInfo/InfoEspece'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import IsConnected from 'lib/isConnected'
import { useContext, useState } from 'react'
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

  const [verif, setverif] = useState('')

  function nourrir (event: any) {
    event.preventDefault()
    const data = {
      espece: espece._id,
      createur: role,
      observations: event.target.observations.value
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
    setverif('')
  }

  function stimuler (event: any) {
    event.preventDefault()
    const data = {
      espece: espece._id,
      createur: role,
      observations: event.target.observations.value
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
    setverif('')
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
              {!verif && (
                <button onClick={() => setverif('nourrissage')}>Nourrir</button>
              )}
              {verif === 'nourrissage' && (
                <form className='containerV' onSubmit={nourrir} method='POST'>
                  <input
                    type='text'
                    id='observations'
                    name='observations'
                    placeholder='observations nourrissage'
                  />
                  <br />
                  <button type='submit'>Nourrir</button>
                </form>
              )}
              {!verif && (
                <button onClick={() => setverif('stimuler')}>Stimuler</button>
              )}
              {verif === 'stimuler' && (
                <form className='containerV' onSubmit={stimuler} method='POST'>
                  <input
                    type='text'
                    id='observations'
                    name='observations'
                    placeholder='observations stimulation'
                  />
                  <br />
                  <button type='submit'>stimuler</button>
                </form>
              )}
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
