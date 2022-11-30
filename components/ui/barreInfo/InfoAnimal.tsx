import classes from './barreInfo.module.css'
import Animaux from 'Types/Animaux'

type props = {
  animal: Animaux
  position: string
}

export default function infoEnclos ({ animal, position }: props): JSX.Element {
  return (
    <div className={`${classes.infobarre}`}>
      sexe : {`${animal.sexe}`}
      <br />
      {`${position}`}
    </div>
  )
}
