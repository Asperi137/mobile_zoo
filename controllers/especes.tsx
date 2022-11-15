import { NextApiRequest, NextApiResponse } from 'next/types'
import Especes from '../Types/Especes'
import ResponseError from '../Types/ResponseError'
import EspeceM from '../models/especes'

export function createEspece (
  req: NextApiRequest,
  res: NextApiResponse<Especes[] | Especes | ResponseError>
) {
  const espece = new EspeceM({
    ...req.body
  })
  espece
    .save()
    .then(() => res.status(201).json({ message: 'Espece ajoutée' }))
    .catch((error: ResponseError) => res.status(400).json(error))
  console.log(res.statusMessage)
}

export function modifyEspece (
  req: NextApiRequest,
  res: NextApiResponse<Especes | ResponseError>
) {
  EspeceM.updateOne({ _id: req.query.id }, { ...req.body, _id: req.query.id })
    .then(() => res.status(200).json({ message: 'Espece modifiée' }))
    .catch(error => res.status(404).json(error))
}

export function deleteEspece (
  req: NextApiRequest,
  res: NextApiResponse<Especes | ResponseError>
) {
  EspeceM.deleteOne({ _id: req.query.id })
    .then(() => res.status(200).json({ message: 'Espece supprimée' }))
    .catch(error => res.status(404).json(error))
}

export function getOneEspece (
  req: NextApiRequest,
  res: NextApiResponse<Especes | ResponseError>
) {
  EspeceM.findOne({ _id: req.query.id })
    .then(espece => res.status(200).json(espece))
    .catch(error => res.status(404).json(error))
}

export function getEspeces (
  req: NextApiRequest,
  res: NextApiResponse<Especes[] | Especes | ResponseError>
) {
  EspeceM.find()
    .then(espece => res.status(200).json(espece))
    .catch(error => res.status(400).json(error))
}
