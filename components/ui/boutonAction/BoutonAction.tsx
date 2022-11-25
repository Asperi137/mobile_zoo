import { UserContext } from 'lib/UserContext'
import { useContext, useState } from 'react'

const API_adr = process.env.API_adr

type props = { cible: string; action: string; API_adr: string }

export default function BoutonAction ({ cible, action, API_adr }: props) {
  const { role } = useContext(UserContext)
  const [verif, setverif] = useState('')

  function valider (event: any) {
    let type = 'especes'
    let data = {}
    event.preventDefault()

    switch (action) {
      case 'soigner':
        {
          type = 'animaux'
        }
        break
      case 'verifier':
        {
          type = 'enclos'
        }
        break
    }
    switch (type) {
      case 'enclos':
        {
          data = {
            enclos: cible,
            createur: role,
            observations: event.target.observations.value
          }
        }
        break
      case 'especes':
        {
          data = {
            espece: cible,
            createur: role,
            observations: event.target.observations.value
          }
        }
        break
      case 'animaux':
        {
          data = {
            animal: cible,
            createur: role,
            observations: event.target.observations.value
          }
        }
        break
    }

    console.log(data)
    const JSONdata = JSON.stringify(data)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata
    }
    fetch(`${API_adr}${type}/${action}`, options)
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
          <button type='submit'>{action}</button>
        </form>
      )}
    </>
  )
}
