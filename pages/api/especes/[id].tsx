import { NextApiRequest, NextApiResponse } from 'next'
import Especes from '../../../Types/Especes'
import EspeceM from '../../../models/especes'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'
import {
  deleteEspece,
  getOneEspece,
  modifyEspece
} from '../../../controllers/especes'

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
      getOneEspece(req, res)
      break
    case 'PUT':
      modifyEspece(req, res)
      break
    case 'DELETE':
      deleteEspece(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
