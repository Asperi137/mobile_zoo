import IsConnected from 'lib/isConnected'
import { UserContext } from 'lib/UserContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import apiConnect from 'lib/apiConnect'

export default function FormConnect () {
  const { setRole } = useContext(UserContext)
  const router = useRouter()

  const deconnection = () => {
    const data = { login: '', password: '', role: '' }
    const JSONdata = JSON.stringify(data)
    const endpoint = `${apiConnect()}auth/logout`
    const options = {
      method: 'POST',
      body: JSONdata
    }
    fetch(endpoint, options)
      .then(res => res.json())
      .then(() => {
        setRole('')
      })
  }

  const connection = async (role: string) => {
    setRole(role)
    router.push('/enclos')
  }

  const formSubmit = async (event: any) => {
    event.preventDefault()
    if (!event.target.login.value || !event.target.password.value) {
      alert('Veuiller entrer un login et un mot de passe')
      deconnection()
    } else {
      const data = {
        login: event.target.login.value,
        password: event.target.password.value
      }
      const JSONdata = JSON.stringify(data)
      const endpoint = `/api/login`
      const options: RequestInit = {
        method: 'POST',
        body: JSONdata
      }
      let req = new Request(endpoint, options)
      fetch(req)
        .then(result => result.json())
        .then(response => {
          if (!response.role) {
            alert(response.message)
          } else {
            connection(response.role)
          }
        })
    }
  }

  return (
    <>
      {!IsConnected() && (
        <form id='login' onSubmit={formSubmit} method='POST'>
          <label htmlFor='login'>Login:</label>
          <br />
          <input type='text' id='login' name='login' required />
          <br />
          <label htmlFor='password'>mot de passe:</label>
          <br />
          <input type='password' id='password' name='password' required />
          <br />
          <button type='submit'>Submit</button>
        </form>
      )}
      {IsConnected() && (
        <div className='alignCenter'>
          <h2>Bienvenue au ZOO !</h2>
          <button onClick={deconnection}>déconnection</button>
        </div>
      )}
    </>
  )
}
