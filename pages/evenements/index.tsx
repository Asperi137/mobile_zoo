import IsConnected from 'lib/isConnected'
import Link from 'next/link'
import Evenements from 'Types/Evenements'
import { SetStateAction, useState } from 'react'
import Especes from 'Types/Especes'
import Enclos from 'Types/Enclos'
import Animaux from 'Types/Animaux'
import Zones from 'Types/Zones'
import Type_evenements from 'Types/Type_evenements'
import TableauEvent from 'components/ui/TableauEvent/TableauEvent'

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

function tri (event: Evenements[]) {
  const triDate = (a: Evenements, b: Evenements) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  return event.sort(triDate)
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
  const [affichage, setAffichage] = useState<Evenements[]>(tri(evenements))
  const [choix, setChoix] = useState<string>('tout')
  const [choixT, setChoixT] = useState<string>('')

  async function filtrage (): Promise<void> {
    let resu = await fetch(`${API_adr}evenements`).then(res => res.json())
    if (
      choixT === 'type' ||
      choixT === 'zones' ||
      choixT === 'enclos' ||
      choixT === 'especes' ||
      choixT === 'animaux'
    ) {
      resu = await fetch(`${API_adr}evenements/${choixT}/${choix}`).then(res =>
        res.json()
      )
    }
    setAffichage(tri(resu))
  }

  return (
    <>
      {IsConnected() && (
        <>
          <div className='alignCenter'>
            <h2>
              Tableaux des evenements : {choixT} {choix}
            </h2>
          </div>
          <div className='containerH, alignCenter '>
            Filtrage :
            <button
              onClick={() => {
                setChoixT('tout')
                setChoix('')
                filtrage()
              }}
            >
              TOUT
            </button>
            <button
              onClick={() => {
                setChoixT('type')
                setChoix('')
              }}
            >
              Type
            </button>
            <button
              onClick={() => {
                setChoixT('zones')
                setChoix('')
              }}
            >
              Zones
            </button>
            <button
              onClick={() => {
                setChoixT('enclos')
                setChoix('')
              }}
            >
              Enclos
            </button>
            <button
              onClick={() => {
                setChoixT('especes')
                setChoix('')
              }}
            >
              Especes
            </button>
            <button
              onClick={() => {
                setChoixT('animaux')
                setChoix('')
              }}
            >
              Animaux
            </button>
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
            {choixT === 'zones' &&
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
            {choixT === 'animaux' &&
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
          <TableauEvent affichage={affichage} />
        </>
      )}
      {!IsConnected() && (
        <button className='btnRetour'>
          <Link href='/'>Veillez vous connecter</Link>
        </button>
      )}
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
