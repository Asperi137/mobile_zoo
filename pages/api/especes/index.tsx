import { NextApiRequest, NextApiResponse } from 'next'
import EspeceM from '../../../models/especes'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'
import Especes from '../../../Types/Especes'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Especes[] | Especes | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

  switch (req.method) {
    case 'GET':
      EspeceM.find()
        .then(espece => res.status(200).json(espece))
        .catch(error => res.status(400).json(error))
      break
    case 'POST':
      const espece = new EspeceM({
        ...req.body
      })
      espece
        .save()
        .then(() => res.status(201).json({ message: 'Espece ajoutée' }))
        .catch((error: ResponseError) => res.status(400).json(error))
      console.log(res.statusMessage)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
