import classes from './Header.module.css'
import Link from 'next/link'
import BarreRecherche from '../barreRecherche/BarreRecherche'

export default function Header (): JSX.Element {
  return (
    <>
      <header className={classes.Header}>
        <Link href='/'>
          <h1>Mon Zoo Mobile !</h1>
        </Link>
        <BarreRecherche />
      </header>
    </>
  )
}
