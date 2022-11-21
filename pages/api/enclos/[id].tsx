import { NextApiRequest, NextApiResponse } from 'next'
import Enclos from 'Types/Enclos'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import { deleteEnclos, getOneEnclos, modifyEnclos } from 'controllers/enclos'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Enclos | ResponseError>
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
        getOneEnclos(req, res)
        break
      case 'PUT':
        modifyEnclos(req, res)
        break
      case 'DELETE':
        deleteEnclos(req, res)
        break

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}
