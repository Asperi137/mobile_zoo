import styles from 'styles/Home.module.css'
import Link from 'next/link'
import FormConnect from 'components/ui/FormConnect/FormConnect'
import IsConnected from 'lib/isConnected'

export default function Index () {
  return (
    <div className={styles.container}>
      <div>
        <FormConnect />
      </div>
    </div>
  )
}
