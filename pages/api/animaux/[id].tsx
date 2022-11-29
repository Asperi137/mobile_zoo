import { NextApiRequest, NextApiResponse } from 'next'
import Animaux from 'Types/Animaux'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import { deleteAnimal, getOneAnimal, modifyAnimal } from 'controllers/animaux'

mongooseConnect()

/**
 * @swagger
 * /api/animaux/[id]:
 *   get:
 *     tags: [Animaux]
 *     description: Returns les caracteristique de l'animal [id]
 *     responses:
 *       200:
 *         description: les caracteristique de l'animal [id]
 *       404:
 *         description: animal non trouvé
 */
/**
 * @swagger
 * /api/animaux/[id]:
 *   put:
 *     tags: [Animaux]
 *     description: modifie les caracteriqtique de l'animal [id]
 *     responses:
 *       202:
 *         description: Animal modifié
 *       400:
 *         description: error
 */
/**
 * @swagger
 * /api/animaux/[id]:
 *   delete:
 *     tags: [Animaux]
 *     description: supprime l'animal [id]
 *     responses:
 *       410:
 *         description: Animal supprimé
 *       404:
 *         description: error
 */
export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Animaux | ResponseError>
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
        getOneAnimal(req, res)
        break
      case 'PUT':
        modifyAnimal(req, res)
        break
      case 'DELETE':
        deleteAnimal(req, res)
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}
