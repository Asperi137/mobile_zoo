import IsConnected from 'lib/isConnected'
import Link from 'next/link'
import Evenements from 'Types/Evenements'
import { MouseEvent, useState } from 'react'
import Especes from 'Types/Especes'
import Enclos from 'Types/Enclos'
import Animaux from 'Types/Animaux'
import Zones from 'Types/Zones'
import Type_evenements from 'Types/Type_evenements'

const API_adr = process.env.API_adr

type Props = {
  evenements: Evenements[]
  animaux: Animaux[]
  especes: Especes[]
  enclos: Enclos[]
  zones: Zones[]
  Type_evenements: Type_evenements[]
  API_adr: string
}

export default function Index ({
  evenements,
  animaux,
  especes,
  enclos,
  zones,
  Type_evenements,
  API_adr
}: Props) {
  const [affichage, setAffichage] = useState<Evenements[]>([])
  const [choix, setChoix] = useState<string>('tout')
  const [choixT, setChoixT] = useState<string>('tout')

  async function filtrage (): Promise<void> {
    switch (choixT) {
      case 'tout': {
        setAffichage(
          await fetch(`${API_adr}evenements`).then(res => res.json())
        )
        break
      }
      case 'zones': {
        setAffichage(
          await fetch(`${API_adr}evenements/${choix}/${choix}`).then(res =>
            res.json()
          )
        )
        break
      }
      case 'enclos': {
        setAffichage(
          await fetch(`${API_adr}evenements/${choixT}/${choix}`).then(res =>
            res.json()
          )
        )
        break
      }
      case 'especes': {
        setAffichage(
          await fetch(`${API_adr}evenements/${choixT}/${choix}`).then(res =>
            res.json()
          )
        )
        break
      }
      case 'animaux': {
        setAffichage(
          await fetch(`${API_adr}evenements/${choixT}/${choix}`).then(res =>
            res.json()
          )
        )
        break
      }
    }
  }

  return (
    <>
      {
        /* IsConnected() &&  */ <>
          <div className='alignCenter'>
            <h2>Tableaux des evenements : {choix}</h2>
          </div>
          <div>
            <button onClick={() => setChoixT('type')}>Type</button>
            <button onClick={() => setChoixT('zones')}>Zones</button>
            <button onClick={() => setChoixT('enclos')}>Enclos</button>
            <button onClick={() => setChoixT('especes')}>Especes</button>
            <button onClick={() => setChoixT('animaux')}>animal</button>
          </div>
          <div className='containerH , bordered'>
            {choixT === 'type' &&
              Type_evenements.map(type => (
                <div key={type._id} className='containerV '>
                  <div
                    onClick={e => {
                      filtrage()
                      setChoix(type._id)
                    }}
                  >
                    {type.nom}
                  </div>
                </div>
              ))}
            {choixT === 'zone' &&
              zones.map(zone => (
                <div key={zone._id} className='containerV '>
                  <div
                    onClick={e => {
                      filtrage()
                      setChoix(zone._id)
                    }}
                  >
                    {zone.nom}
                  </div>
                </div>
              ))}
            {choixT === 'enclos' &&
              enclos.map(enclos => (
                <div key={enclos._id} className='containerV '>
                  <div
                    onClick={e => {
                      filtrage()
                      setChoix(enclos._id)
                    }}
                  >
                    {enclos.nom}
                  </div>
                </div>
              ))}
            {choixT === 'especes' &&
              especes.map(espece => (
                <div key={espece._id} className='containerV '>
                  <div
                    onClick={e => {
                      filtrage()
                      setChoix(espece._id)
                    }}
                  >
                    {espece.nom}
                  </div>
                </div>
              ))}
            {choixT === 'animal' &&
              animaux.map(animal => (
                <div key={animal._id} className='containerV '>
                  <div
                    onClick={e => {
                      filtrage()
                      setChoix(animal._id)
                    }}
                  >
                    {animal.nom}
                  </div>
                </div>
              ))}
          </div>
          <table>
            <thead>
              <tr>
                <th scope='col'>Date de création</th>
                <th scope='col'>Type</th>
                <th scope='col'>Zone</th>
                <th scope='col'>Enclos</th>
                <th scope='col'>Espece</th>
                <th scope='col'>Animal</th>
                <th scope='col'>Createur</th>
                <th scope='col'>Observations</th>
              </tr>
            </thead>
            <tbody>
              {affichage.map((event: Evenements) => (
                <tr key={event._id}>
                  <td>{event.createdAt.toString()}</td>
                  <td>{event.type}</td>
                  <td>
                    <Link href={`/enclos`} as={`/enclos`}>
                      {event.zone}
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={`/enclos/${event.enclos}`}
                      as={`/enclos/${event.enclos}`}
                    >
                      {event.enclos}
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={`/especes/${event.espece}`}
                      as={`/especes/${event.espece}`}
                    >
                      {event.espece}
                    </Link>
                  </td>
                  <td>{event.animal}</td>
                  <td>{event.createur}</td>
                  <td>{event.observations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
      <br />
    </>
  )
}

export async function getServerSideProps () {
  const evenements: Evenements[] = await fetch(`${API_adr}evenements`).then(
    res => res.json()
  )
  const Type_evenements: Type_evenements[] = await fetch(
    `${API_adr}evenements/type`
  ).then(res => res.json())

  const animaux: Animaux[] = await fetch(`${API_adr}animaux`).then(res =>
    res.json()
  )
  const especes: Especes[] = await fetch(`${API_adr}especes`).then(res =>
    res.json()
  )
  const enclos: Enclos[] = await fetch(`${API_adr}enclos`).then(res =>
    res.json()
  )
  const zones: Zones[] = await fetch(`${API_adr}zones`).then(res => res.json())
  return {
    props: {
      evenements,
      animaux,
      especes,
      enclos,
      zones,
      Type_evenements,
      API_adr
    }
  }
}
