import { NextApiRequest, NextApiResponse } from 'next'
import Enclos from '../../../Types/Enclos'
import EnclosM from '../../../models/enclos'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Enclos[] | Enclos | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

  switch (req.method) {
    case 'GET':
      EnclosM.find()
        .then(enclos => res.status(200).json(enclos))
        .catch(error => res.status(400).json(error))
      break
    case 'POST':
      const enclos = new EnclosM({
        ...req.body
      })
      enclos
        .save()
        .then(() => res.status(201).json({ message: 'Enclos ajouté' }))
        .catch((error: ResponseError) => res.status(400).json(error))
      console.log(res.statusMessage)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
