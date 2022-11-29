import { NextApiRequest, NextApiResponse } from 'next'

import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import Especes from 'Types/Especes'
import { createEspece, getEspeces } from 'controllers/especes'

mongooseConnect()
/**
 * @swagger
 * /api/especes:
 *   get:
 *     tags: [Especes]
 *     description: Returns la list des especes
 *     responses:
 *       200:
 *         description: la list des especes
 *       404:
 *         description: error
 */
/**
 * @swagger
 * /api/especes:
 *   post:
 *     tags: [Especes]
 *     description: Creer un especes [id]
 *     responses:
 *       201:
 *         description: especes ajouté
 *       400:
 *         description: error
 */

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Especes[] | Especes | ResponseError>
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
        getEspeces(req, res)
        break
      case 'POST':
        createEspece(req, res)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}
