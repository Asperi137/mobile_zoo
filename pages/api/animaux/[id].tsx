import { NextApiRequest, NextApiResponse } from 'next'
import Animaux from '../../../Types/Animaux'
import AnimalM from '../../../models/animaux'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Animaux | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE')

  switch (req.method) {
    case 'GET':
      AnimalM.findOne({ _id: req.query.id })
        .then(animal => res.status(200).json(animal))
        .catch(error => res.status(404).json(error))
      break
    case 'PUT':
      AnimalM.updateOne(
        { _id: req.query.id },
        { ...req.body, _id: req.query.id }
      )
        .then(() => res.status(200).json({ message: 'Animal modifié' }))
        .catch(error => res.status(404).json(error))
      break
    case 'DELETE':
      AnimalM.deleteOne({ _id: req.query.id })
        .then(() => res.status(200).json({ message: 'Animal supprimé' }))
        .catch(error => res.status(404).json(error))
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
