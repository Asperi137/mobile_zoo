import { NextApiRequest, NextApiResponse } from 'next/types'
import ResponseError from '../Types/ResponseError'
import Animaux from '../Types/Animaux'
import AnimalM from '../models/animaux'

export function createAnimal (
  req: NextApiRequest,
  res: NextApiResponse<Animaux[] | Animaux | ResponseError>
) {
  const animal = new AnimalM({
    ...req.body
  })
  animal
    .save()
    .then(() => res.status(201).json({ message: 'Animal ajouté' }))
    .catch((error: ResponseError) => res.status(400).json(error))
  console.log(res.statusMessage)
}

export function modifyAnimal (
  req: NextApiRequest,
  res: NextApiResponse<Animaux | ResponseError>
) {
  AnimalM.updateOne({ _id: req.query.id }, { ...req.body, _id: req.query.id })
    .then(() => res.status(202).json({ message: 'Animal modifié' }))
    .catch((error: ResponseError) => res.status(400).json(error))
}

export function deleteAnimal (
  req: NextApiRequest,
  res: NextApiResponse<Animaux | ResponseError>
) {
  AnimalM.deleteOne({ _id: req.query.id })
    .then(() => res.status(410).json({ message: 'Animal supprimé' }))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function getOneAnimal (
  req: NextApiRequest,
  res: NextApiResponse<Animaux | ResponseError>
) {
  AnimalM.findOne({ _id: req.query.id })
    .then(animal => res.status(200).json(animal))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function getAnimaux (
  req: NextApiRequest,
  res: NextApiResponse<Animaux[] | Animaux | ResponseError>
) {
  AnimalM.find()
    .then(animal => res.status(200).json(animal))
    .catch((error: ResponseError) => res.status(404).json(error))
}
