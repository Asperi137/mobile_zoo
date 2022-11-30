import classes from './barreInfo.module.css'
import Especes from 'Types/Especes'

type props = { espece: Especes }

function isSociable (espece: Especes) {
  if (espece.sociable) return 'sociable'
  else return 'non sociable'
}
function isDanger (espece: Especes) {
  if (espece.dangereux) return 'dangereux'
  else return 'inoffensif'
}

export default function infoEnclos ({ espece }: props): JSX.Element {
  return (
    <div className={`${classes.infobarre}`}>
      {`${espece.nom}`}
      <br />
      {`${isSociable(espece)} `}
      <br />
      {`${isDanger(espece)}`}
      <br />
      {`${espece.observations}`}
    </div>
  )
}
