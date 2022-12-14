import { UserContext } from 'lib/UserContext'
import { Dispatch, SetStateAction, useContext, useState } from 'react'

const API_adr = process.env.API_adr

type props = {
  cible: string
  API_adr: string
  position: string
  headers: Headers
  setPosition: Dispatch<SetStateAction<string>>
}

export default function BoutonEntrerSortir ({
  cible,
  API_adr,
  position,
  headers,
  setPosition
}: props) {
  const { role } = useContext(UserContext)
  const [verif, setverif] = useState('')
  let action = 'rentrer'
  if (position === 'dedans') {
    action = 'sortir'
  }

  function valider (event: any) {
    event.preventDefault()
    let type = 'animaux'

    const data = {
      animal: cible,
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
    fetch(`${API_adr}${type}/${action}`, options).then(() => {
      if (action === 'sortir') {
        setPosition('dehors')
      } else setPosition('dedans')
    })

    setverif('')
  }
  function annuler (event: any) {
    event.preventDefault()
    setverif('')
  }

  return (
    <>
      {!verif && <button onClick={() => setverif('action')}>{action}</button>}
      {verif && (
        <form
          className='containerV'
          id={action}
          onSubmit={valider}
          method='POST'
        >
          <input
            type='text'
            id='observations'
            name='observations'
            placeholder={`observations ${action}`}
          />
          <br />
          <div>
            <button type='submit'>{action}</button>
            <button onClick={annuler}>annuler</button>
          </div>
        </form>
      )}
    </>
  )
}
