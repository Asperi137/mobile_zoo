import IsConnected from 'lib/isConnected'
import { UserContext } from 'lib/UserContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function Nav () {
  const { setRole } = useContext(UserContext)
  const router = useRouter()

  const deconection = async (event: any) => {
    setRole('')
    router.push('/')
  }

  return (
    <nav>
      <div className='containerH'>
        {!IsConnected() && <Link href='/'>Connection</Link>}
        {IsConnected() && (
          <>
            <Link href='/'>
              <span onClick={deconection}>déconnection</span>
            </Link>
            <br />|
            <br />
            <Link href='/enclos'>enclos</Link>
            <br />
            <Link href='/especes'>especes</Link>
            <br />
            <Link href='/animaux'>animaux</Link>
            <br />|<br />
            <Link href='/evenements'>Evenement</Link>
          </>
        )}
      </div>
    </nav>
  )
}
