import { NextApiRequest, NextApiResponse } from 'next/types'
import Evenements from 'Types/Evenements'
import ResponseError from 'Types/ResponseError'
import EvenementsM from 'models/evenements'

export function getEventsOneEnclos (
  req: NextApiRequest,
  res: NextApiResponse<Evenements[] | ResponseError>
) {
  EvenementsM.find({ enclos: req.query.id })
    .then(evenement => res.status(200).json(evenement))
    .catch((error: ResponseError) => res.status(404).json(error))
}
