import Link from 'next/link'
import Evenements from 'Types/Evenements'
import classes from './tableauEvent.module.css'

type Props = {
  affichage: Evenements[]
  pageEvent: string
}

export function tri (event: Evenements[]) {
  const triDate = (a: Evenements, b: Evenements) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  return event.sort(triDate)
}

export default function TableauEvent ({ affichage, pageEvent }: Props) {
  return (
    <table className='table'>
      <thead className='thead'>
        <tr>
          <th scope='col'>Date de création</th>
          <th scope='col'>Type</th>
          {pageEvent === 'enclos' && <th scope='col'>Espece</th>}
          {(pageEvent === 'enclos' || pageEvent === 'especes') && (
            <th scope='col'>Animal</th>
          )}
          <th scope='col'>Observations</th> <th scope='col'>Createur</th>
        </tr>
      </thead>
      <tbody>
        {affichage.map((event: Evenements) => (
          <tr key={event._id}>
            <td>{new Date(event.createdAt).toLocaleString()}</td>
            <td>{event.type}</td>
            {pageEvent === 'enclos' && (
              <td>
                <Link
                  href={`/especes/${event.espece}`}
                  as={`/especes/${event.espece}`}
                >
                  {event.espece}
                </Link>
              </td>
            )}
            {(pageEvent === 'enclos' || pageEvent === 'especes') && (
              <td>
                <Link
                  href={`/animaux/${event.animal}`}
                  as={`/animaux/${event.animal}`}
                >
                  {event.animal}
                </Link>
              </td>
            )}
            <td>{event.observations}</td>
            <td>{event.createur}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
