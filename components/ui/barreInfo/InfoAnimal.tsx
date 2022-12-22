import Animaux from 'Types/Animaux'

type props = {
  animal: Animaux
  position: string
}

export default function infoAnimal ({ animal, position }: props): JSX.Element {
  return (
    <div className={`bordered`}>
      <details>
        <summary> {`${animal.nom}`}</summary>
        sexe : {`${animal.sexe}`}
        <br />
        {`${position}`}
      </details>
    </div>
  )
}
