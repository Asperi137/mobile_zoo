import { NextApiRequest, NextApiResponse } from 'next/types'
import Especes from 'Types/Especes'
import ResponseError from 'Types/ResponseError'
import EspeceM from 'models/especes'
import EvenementsM from 'models/evenements'
import Evenements from 'Types/Evenements'
import Enclos from 'Types/Enclos'
import apiConnect from 'lib/apiConnect'

export async function agirSurEspeces (
  action: string,
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  let body = req.body
  if (typeof body === 'string') {
    body = JSON.parse(req.body)
  }
  const date = Date.now()

  const espece: Especes = await fetch(
    `${apiConnect()}especes/${body.espece}`
  ).then(res => res.json())

  const enclos: Enclos = await fetch(
    `${apiConnect()}enclos/${espece.enclos}`
  ).then(res => res.json())

  const evenement = new EvenementsM({
    _id: `${date}_${action}_${body.espece}`,
    createur: body.createur,
    type: action,
    espece: body.espece,
    enclos: enclos._id,
    zone: enclos.zone,
    observations: body.observations
  })

  evenement
    .save()
    .then(() => res.status(201).json({ message: `${action} ajoutée` }))
    .catch((error: ResponseError) => res.status(400).json(error))
}
