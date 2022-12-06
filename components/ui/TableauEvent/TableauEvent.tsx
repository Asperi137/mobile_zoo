import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import Evenements from 'Types/Evenements'

type Props = {
  affichage: Evenements[]
}

export default function TableauEvent ({ affichage }: Props) {
  return (
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
            <td>{new Date(event.createdAt).toLocaleString()}</td>
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
            <td>
              <Link
                href={`/animaux/${event.animal}`}
                as={`/animaux/${event.animal}`}
              >
                {event.animal}
              </Link>
            </td>
            <td>{event.createur}</td>
            <td>{event.observations}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
