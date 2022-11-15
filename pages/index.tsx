import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Index () {
  return (
    <div className={styles.container}>
      <div>bienvenue dans Monzoo</div>
      <ul>
        <li>
          <Link href='/enclos'>enclos</Link>
        </li>
      </ul>
    </div>
  )
}
