import { NextApiRequest, NextApiResponse } from 'next'
import Enclos from '../../../Types/Enclos'
import EnclosM from '../../../models/enclos'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Enclos | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE')

  switch (req.method) {
    case 'GET':
      EnclosM.findOne({ _id: req.query.id })
        .then(enclos => res.status(200).json(enclos))
        .catch(error => res.status(404).json(error))
      break
    case 'PUT':
      EnclosM.updateOne(
        { _id: req.query.id },
        { ...req.body, _id: req.query.id }
      )
        .then(() => res.status(200).json({ message: 'Enclos modifié' }))
        .catch(error => res.status(404).json(error))
      break
    case 'DELETE':
      EnclosM.deleteOne({ _id: req.query.id })
        .then(() => res.status(200).json({ message: 'Enclos supprimé' }))
        .catch(error => res.status(404).json(error))
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
