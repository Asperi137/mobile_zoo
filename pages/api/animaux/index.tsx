import { NextApiRequest, NextApiResponse } from 'next'
import Animaux from '../../../Types/Animaux'
import AnimalM from '../../../models/animaux'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

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
      AnimalM.find()
        .then(animal => res.status(200).json(animal))
        .catch(error => res.status(400).json(error))
      break
    case 'POST':
      const animal = new AnimalM({
        ...req.body
      })
      animal
        .save()
        .then(() => res.status(201).json({ message: 'Animal ajouté' }))
        .catch((error: ResponseError) => res.status(400).json(error))
      console.log(res.statusMessage)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
