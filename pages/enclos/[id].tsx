import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import type  {Enclos}  from '../../Types/Enclos'

type props = {enclos : Enclos} 

export default function Index({enclos}: props): JSX.Element {
  return (
    <ul>
        <li>{`Enclos ${enclos._id}`}</li>
        <li>{`nom ${enclos.nom}`}</li>
        <li>{`zone ${enclos.zone}`}</li>
        <li>{`coordonnées ${enclos.coordonnées}`}</li>
        <li>{`superficie ${enclos.superficie}`}</li>
    </ul>
  )
}

export async function getStaticProps ({params} : Params) {
  const url = `http://localhost:3000/api/enclos/${params.id}`
  const enclos = await fetch(url).then(res => res.json())
	return {
		props: {
			enclos,
		},
	};
}

export async function getStaticPaths() {
  const url = `http://localhost:3000/api/enclos`
  const encloslst = await fetch(url).then(res => res.json())
	return {
		paths: encloslst.map((enclos : Enclos) => ({
			params: { id: enclos._id },
		})),
		fallback: false,
	};
}
