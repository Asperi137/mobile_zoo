import { NextApiRequest, NextApiResponse } from 'next'
import Animaux from '../../../Types/Animaux'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'
import {
  deleteAnimal,
  getOneAnimal,
  modifyAnimal
} from '../../../controllers/animaux'

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
      getOneAnimal(req, res)
      break
    case 'PUT':
      modifyAnimal(req, res)
      break
    case 'DELETE':
      deleteAnimal(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
