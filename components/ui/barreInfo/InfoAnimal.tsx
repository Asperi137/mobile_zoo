import Animaux from 'Types/Animaux'
import Image from 'next/image'

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
        <br />
        <Image
          src={`/images/${animal.espece}.jpg`}
          alt={`Photo de : ${animal.nom}`}
          width={200}
          height={200}
          className='image'
        />
      </details>
    </div>
  )
}
