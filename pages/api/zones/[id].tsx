import { NextApiRequest, NextApiResponse } from 'next'
import Zones from '../../../Types/Zones'
import Zone from '../../../models/zones'
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
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, PUT, DELETE, PATCH, OPTIONS'
  )

  switch (req.method) {
    case 'GET':
      Zone.findOne({ _id: req.query.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json(error))
      break
    case 'PUT':
      res.status(200).json({ message: 'put' })
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
