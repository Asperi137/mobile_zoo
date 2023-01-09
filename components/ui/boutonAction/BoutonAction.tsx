import apiConnect from 'lib/apiConnect'
import { UserContext } from 'lib/UserContext'
import { useContext, useState } from 'react'

type props = {
  cible: string
  action: string
}

export default function BoutonAction ({ cible, action }: props) {
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

    const JSONdata = JSON.stringify(data)
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: JSONdata
    }

    let req = new Request(`/api/${type}/${action}`, options)
    fetch(req).then(() => setverif(''))
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
          onSubmit={event => valider(event)}
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
