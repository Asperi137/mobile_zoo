import { NextApiRequest, NextApiResponse } from 'next'
import Zones from 'Types/Zones'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import { createZone, getZones } from 'controllers/zones'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Zones[] | Zones | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

    switch (req.method) {
      case 'GET':
        getZones(req, res)
        break
      case 'POST':
        createZone(req, res)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}
