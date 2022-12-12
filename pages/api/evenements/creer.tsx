import { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import Evenements from 'Types/Evenements'
import { createEvenement } from 'controllers/evenements'
import { withSessionRoute } from 'lib/withSession'

mongooseConnect()

export default withSessionRoute(creer)

async function creer (
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', ' POST')
    if (req.session.user) {
      if (req.method === 'POST') {
        createEvenement(req, res)
      } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed là`)
      }
    } else res.status(401).end(`Utilisateur non autorisé`)
  })
}
