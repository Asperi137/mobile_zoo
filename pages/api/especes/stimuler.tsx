import { createEspece } from 'controllers/especes'
import mongooseConnect from 'lib/mongooseConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import Especes from 'Types/Especes'
import ResponseError from 'Types/ResponseError'

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
  res.setHeader('Access-Control-Allow-Methods', ' POST')

  switch (req.method) {
    case 'POST':
      createEspece(req, res)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
