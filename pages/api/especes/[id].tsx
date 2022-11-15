import { NextApiRequest, NextApiResponse } from 'next'
import Especes from '../../../Types/Especes'
import EspeceM from '../../../models/especes'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Especes | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE')

  switch (req.method) {
    case 'GET':
      EspeceM.findOne({ _id: req.query.id })
        .then(espece => res.status(200).json(espece))
        .catch(error => res.status(404).json(error))
      break
    case 'PUT':
      EspeceM.updateOne(
        { _id: req.query.id },
        { ...req.body, _id: req.query.id }
      )
        .then(() => res.status(200).json({ message: 'Espece modifiée' }))
        .catch(error => res.status(404).json(error))
      break
    case 'DELETE':
      EspeceM.deleteOne({ _id: req.query.id })
        .then(() => res.status(200).json({ message: 'Espece supprimée' }))
        .catch(error => res.status(404).json(error))
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
