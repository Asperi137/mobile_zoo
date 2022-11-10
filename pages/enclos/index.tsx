import type  {Enclos}  from '../../Types/Enclos'
import type  {Zones}  from '../../Types/Zones'
import { useState, useEffect } from 'react'
import Link from 'next/link'


export default function Index() {
  const [zones, setzones] = useState<Zones[]>([])
  const [enclos, setenclos] = useState<Enclos[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/zones')
      .then((res) => res.json())
      .then((data) => {
        setzones(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch('/api/enclos')
      .then((res) => res.json())
      .then((data) => {
        setenclos(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!zones || zones.length ===0 ) return <p>no zone data</p>
  if (!enclos || enclos.length ===0 ) return <p>no enclos data</p>


  return (
  <> 
    <ul>
      {zones.map((zone) => (<ul key={zone._id}>
        <li > {`zone ${zone._id}`}
        <ul>
        {enclos.map((enclos) => enclos.zone === zone._id &&
          <li key={enclos._id}>
            <Link href="/enclos/[id]" as={`/enclos/${enclos._id}`}>
            {`enclos ${enclos._id}`}
            </Link>
          </li>)}
        </ul>          
        </li></ul>
      ))}
    </ul>
    <ul>
      
    </ul>
  </>
  )
}
