import { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import Evenements from 'Types/Evenements'
import { agirSurAnimaux } from 'controllers/animaux'

mongooseConnect()
const API_adr = process.env.API_adr
/**
 * @swagger
 * /api/animaux/soigner:
 *   post:
 *     tags: [Animaux]
 *     description: Creer un evenement de soins
 *     responses:
 *       201:
 *         description: soin ajouté
 *       400:
 *         description: error
 */

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    if (req.method === 'POST') {
      agirSurAnimaux('soins', req, res)
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed ici`)
    }
  })
}
