import Link from 'next/link'

export default function Nav () {
  return (
    <nav>
      <div className='containerH'>
        <Link href='/'>Connection</Link>
        <br />
        <Link href='/enclos'>enclos</Link>
        <br />
        <Link href='/evenements'>Evenement</Link>
      </div>
    </nav>
  )
}
