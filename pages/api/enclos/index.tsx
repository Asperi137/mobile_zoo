import { NextApiRequest, NextApiResponse } from 'next'
import Enclos from 'Types/Enclos'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import { creatEnclos, getEnclos } from 'controllers/enclos'

mongooseConnect()
/**
 * @swagger
 * /api/enclos:
 *   get:
 *     tags: [Enclos]
 *     description: Returns la list des enclos
 *     responses:
 *       200:
 *         description: la list des enclos
 *       404:
 *         description: error
 */
/**
 * @swagger
 * /api/enclos:
 *   post:
 *     tags: [Enclos]
 *     description: Creer un enclos [id]
 *     responses:
 *       201:
 *         description: enclos ajouté
 *       400:
 *         description: error
 */

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Enclos[] | Enclos | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

    switch (req.method) {
      case 'GET':
        getEnclos(req, res)
        break
      case 'POST':
        creatEnclos(req, res)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}
