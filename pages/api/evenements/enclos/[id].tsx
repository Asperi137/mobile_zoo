import { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import { getEventsCible } from 'controllers/eventCondition'
import Evenements from 'Types/Evenements'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Evenements[] | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

    if (req.method === 'GET') {
      getEventsCible('enclos', req, res)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}
