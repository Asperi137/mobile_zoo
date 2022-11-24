import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import InfoEnclos from 'components/ui/barreInfo/InfoEnclos'
import Enclos from 'Types/Enclos'
import Especes from 'Types/Especes'
import Zones from 'Types/Zones'
import IsConnected from 'lib/isConnected'
import { useContext, useState } from 'react'
import { UserContext } from 'lib/UserContext'

const API_adr = process.env.API_adr

type props = {
  enclos: Enclos
  especeslst: Especes[]
  zone: Zones
  API_adr: string
}

export default function Index ({
  enclos,
  especeslst,
  zone,
  API_adr
}: props): JSX.Element {
  const { role } = useContext(UserContext)

  const [verif, setverif] = useState('')

  async function verifier (event: any) {
    event.preventDefault()

    const data = {
      enclos: enclos._id,
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

    fetch(`${API_adr}enclos/verifier`, options)
    setverif('')
  }

  return (
    <div className='containerV'>
      {
        /*IsConnected() && */ <>
          <button className='btnRetour'>
            <Link href={`/enclos`} as={`/enclos`}>
              {`retour à la liste des enclos `}
            </Link>
          </button>
          <div className='containerV'>
            <div className='containerV'>
              {!verif && (
                <button onClick={() => setverif('verifier')}>
                  Verifier enclos
                </button>
              )}
              {verif && (
                <form className='containerV' onSubmit={verifier} method='POST'>
                  <input
                    type='text'
                    id='observations'
                    name='observations'
                    placeholder="observations sur l'enclos"
                  />
                  <br />
                  <button type='submit'>Valider</button>
                </form>
              )}
            </div>
            <InfoEnclos enclos={enclos} zone={zone} />
          </div>
          <div className='containerH'>
            {especeslst.map(
              (especes: Especes) =>
                especes.enclos === enclos._id && (
                  <div className='containerV , bordered' key={especes._id}>
                    <button>
                      <Link href='/especes/[id]' as={`/especes/${especes._id}`}>
                        {`${especes.nom}`}
                      </Link>
                    </button>
                  </div>
                )
            )}
          </div>
        </>
      }
      {!IsConnected() && (
        <button className='btnRetour'>
          <Link href='/'>Veillez vous connecter</Link>
        </button>
      )}
    </div>
  )
}

export async function getServerSideProps ({ params }: Params) {
  const especeslst = await fetch(`${API_adr}especes`).then(res => res.json())
  const enclos = await fetch(`${API_adr}enclos/${params.id}`).then(res =>
    res.json()
  )
  const zone = await fetch(`${API_adr}zones/${enclos.zone}`).then(res =>
    res.json()
  )
  return {
    props: {
      enclos,
      especeslst,
      zone,
      API_adr
    }
  }
}
