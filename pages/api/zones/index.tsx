import { NextApiRequest, NextApiResponse } from 'next'
import Zones from '../../../Types/Zones'
import Zone from '../../../models/zones'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

mongooseConnect()

export default async function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Zones[] | Zones | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )

  switch (req.method) {
    case 'GET':
      Zone.find()
        .then(zones => res.status(200).json(zones))
        .catch(error => res.status(400).json(error))
      break
    case 'POST':
      const zone = new Zone({
        ...req.body
      })
      zone
        .save()
        .then(() => res.status(201).json({ message: 'zone ajoutée' }))
        .catch((error: ResponseError) => res.status(400).json(error))
      console.log(res.statusMessage)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
