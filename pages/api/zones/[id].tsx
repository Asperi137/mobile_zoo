import { NextApiRequest, NextApiResponse } from 'next'
import Zones from '../../../Types/Zones'
import ZoneM from '../../../models/zones'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Zones | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE')

  switch (req.method) {
    case 'GET':
      ZoneM.findOne({ _id: req.query.id })
        .then(zone => res.status(200).json(zone))
        .catch(error => res.status(404).json(error))
      break
    case 'PUT':
      ZoneM.updateOne({ _id: req.query.id }, { ...req.body, _id: req.query.id })
        .then(() => res.status(200).json({ message: 'Zone modifiée' }))
        .catch(error => res.status(404).json(error))
      break
    case 'DELETE':
      ZoneM.deleteOne({ _id: req.query.id })
        .then(() => res.status(200).json({ message: 'Zone supprimée' }))
        .catch(error => res.status(404).json(error))
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
