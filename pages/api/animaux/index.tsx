import { NextApiRequest, NextApiResponse } from 'next'
import Animaux from '../../../Types/Animaux'
import AnimalM from '../../../models/animaux'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'
import { createAnimal, getAnimaux } from '../../../controllers/animaux'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Animaux[] | Animaux | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

  switch (req.method) {
    case 'GET':
      getAnimaux(req, res)
      break
    case 'POST':
      createAnimal(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
