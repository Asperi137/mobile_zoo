import { NextApiRequest, NextApiResponse } from 'next'
import Zones from '../../../Types/Zones'
import ZoneM from '../../../models/zones'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Zones[] | Zones | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

  switch (req.method) {
    case 'GET':
      ZoneM.find()
        .then(zones => res.status(200).json(zones))
        .catch(error => res.status(400).json(error))
      break
    case 'POST':
      const zone = new ZoneM({
        ...req.body
      })
      zone
        .save()
        .then(() => res.status(201).json({ message: 'Zone ajoutée' }))
        .catch((error: ResponseError) => res.status(400).json(error))
      console.log(res.statusMessage)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
