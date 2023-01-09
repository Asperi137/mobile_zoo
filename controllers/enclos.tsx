import { NextApiRequest, NextApiResponse } from 'next/types'
import ResponseError from '../Types/ResponseError'
import Enclos from 'Types/Enclos'
import EnclosM from 'models/enclos'
import EvenementsM from 'models/evenements'
import Evenements from 'Types/Evenements'
import apiConnect from 'lib/apiConnect'

export async function agirSurEnclos (
  action: string,
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  let body = req.body
  if (typeof body === 'string') {
    body = JSON.parse(req.body)
  }
  const date = Date.now()

  const enclos: Enclos = await fetch(
    `${apiConnect()}enclos/${body.enclos}`
  ).then(res => res.json())

  console.log(enclos)

  const evenement = new EvenementsM({
    _id: `${date}_${action}_${body.enclos}`,
    createur: body.createur,
    type: action,
    enclos: body.enclos,
    zone: enclos.zone,
    observations: body.observations
  })

  evenement
    .save()
    .then(() => res.status(201).json({ message: `${action} ajoutée` }))
    .catch((error: ResponseError) => res.status(400).json(error))
}
