import classes from './Nav.module.css'
import IsConnected from 'lib/isConnected'
import { UserContext } from 'lib/UserContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function Nav () {
  const { setRole } = useContext(UserContext)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const deconnection = () => {
    fetch(`/api/logout`, {
      method: 'POST',
      body: JSON.stringify({ login: '', password: '', role: '' })
    })
      .then(res => res.json())
      .then(() => {
        setRole('')
        router.push('/')
      })
  }

  return (
    <>
      {!IsConnected() && (
        <nav className={classes.contH}>
          <Link href='/'>Connection</Link>
        </nav>
      )}
      {IsConnected() && (
        <nav className={classes.contH}>
          {!open && <button onClick={() => setOpen(!open)}>Navigation</button>}
          {open && (
            <>
              <div className={classes.contH}>
                <Link href='/'>
                  <span onClick={deconnection}>déconnection</span>
                </Link>
              </div>
              <button onClick={() => setOpen(!open)}>Navigation</button>
              <div className={classes.contH}>
                <div className={classes.contH}>
                  <Link href='/enclos'>enclos</Link>

                  <Link href='/especes'>especes</Link>

                  <Link href='/animaux'>animaux</Link>
                </div>
                <div className={classes.contH}>
                  <Link href='/evenements'>Evenement</Link>
                </div>
              </div>
            </>
          )}
        </nav>
      )}
    </>
  )
}
