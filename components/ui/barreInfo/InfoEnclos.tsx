import classes from './barreInfo.module.css'
import Enclos from 'Types/Enclos'
import Zones from 'Types/Zones'

type props = { enclos: Enclos; zone: Zones }

export default function infoEnclos ({ enclos, zone }: props): JSX.Element {
  return (
    <div className={`bordered`}>
      <details>
        <summary> {`${enclos.nom}`}</summary>
        {`${zone.nom}`}
        <br />
        {`superficie : ${enclos.superficie} m²`}
        <br />
        {`${enclos.coordonnées}`}
        <br />
      </details>
    </div>
  )
}
