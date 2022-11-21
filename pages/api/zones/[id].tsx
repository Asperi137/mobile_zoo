import { NextApiRequest, NextApiResponse } from 'next'
import Zones from 'Types/Zones'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import { deleteZone, getOneZone, modifyZone } from 'controllers/zones'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Zones | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE')

    switch (req.method) {
      case 'GET':
        getOneZone(req, res)
        break
      case 'PUT':
        modifyZone(req, res)
        break
      case 'DELETE':
        deleteZone(req, res)
        break

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}
