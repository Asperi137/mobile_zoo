import { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import Evenements from 'Types/Evenements'
import { getEvenements } from 'controllers/evenements'
import { withSessionRoute } from 'lib/withSession'

mongooseConnect()
export default withSessionRoute(index)

async function index (
  req: NextApiRequest,
  res: NextApiResponse<Evenements[] | Evenements | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    if (req.session.user) {
      if (req.method === 'GET') {
        getEvenements(req, res)
      } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
      }
    } else res.status(401).end(`Utilisateur non autorisé`)
  })
}
