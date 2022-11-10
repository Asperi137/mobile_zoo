
import styles from '../styles/Home.module.css'
import {Enclos}  from '../Types/Enclos'
import useSwr from 'swr'
import Link from 'next/link'

const fetcher = (url : string) => fetch(url).then ((res)=> res.json())

export default function Index() {
  const { data, error } = useSwr<Enclos[]>('/api/enclos', fetcher)

  if (error) return <div>Failed to load Enclos</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <div>bienvenue dans Monzoo</div>
      <ul>
        <li>
          <Link href="/enclos">
            enclos
          </Link>
        </li>
    </ul>
    </div>
  )
}
