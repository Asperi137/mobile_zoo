import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../Types/User'
import mongooseConnect from '../../../lib/mongooseConnect'
import ResponseError from '../../../Types/ResponseError'
import signup from '../../../controllers/user'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', ' POST')

  if (req.method === 'POST') {
    signup(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
