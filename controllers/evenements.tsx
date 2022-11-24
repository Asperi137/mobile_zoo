import { NextApiRequest, NextApiResponse } from 'next/types'
import Evenements from 'Types/Evenements'
import ResponseError from 'Types/ResponseError'
import EvenementsM from 'models/evenements'

export function createEvenement (
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  const evenement = new EvenementsM({
    ...req.body
  })
  evenement
    .save()
    .then(() => res.status(201).json({ message: 'Evenements ajoutée' }))
    .catch((error: ResponseError) => res.status(400).json(error))
  console.log(res.statusMessage)
}

export function modifyEvenement (
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  EvenementsM.updateOne(
    { _id: req.query.id },
    { ...req.body, _id: req.query.id }
  )
    .then(() => res.status(202).json({ message: 'Evenements modifiée' }))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function deleteEvenement (
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  EvenementsM.deleteOne({ _id: req.query.id })
    .then(() => res.status(410).json({ message: 'Evenements supprimée' }))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function getOneEvenement (
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  EvenementsM.findOne({ _id: req.query.id })
    .then(evenement => res.status(200).json(evenement))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function getEvenements (
  req: NextApiRequest,
  res: NextApiResponse<Evenements[] | Evenements | ResponseError>
) {
  EvenementsM.find()
    .then(evenements => res.status(200).json(evenements))
    .catch((error: ResponseError) => res.status(400).json(error))
}
