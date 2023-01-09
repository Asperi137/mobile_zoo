import classes from './Header.module.css'
import Link from 'next/link'
import BarreRecherche from '../barreRecherche/BarreRecherche'
import Image from 'next/dist/client/image'
import scan from 'public/qrcode.png'
import IsConnected from 'lib/isConnected'

export default function Header (): JSX.Element {
  return (
    <>
      {IsConnected() && (
        <Link href='/scan'>
          <Image
            src={scan}
            alt='scan'
            width={50}
            height={50}
            className={classes.logo_scan}
          />
        </Link>
      )}
      <header className={classes.Header}>
        <Link href='/'>
          <h1>Mon Zoo Mobile !</h1>
        </Link>
        <BarreRecherche />
      </header>
    </>
  )
}
