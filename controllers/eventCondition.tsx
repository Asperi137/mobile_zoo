import { NextApiRequest, NextApiResponse } from 'next/types'
import Evenements from 'Types/Evenements'
import ResponseError from 'Types/ResponseError'
import EvenementsM from 'models/evenements'

export async function getEventsCible (
  cibleEvent: string,
  req: NextApiRequest,
  res: NextApiResponse<Evenements[] | ResponseError>
) {
  switch (cibleEvent) {
    case 'zone': {
      EvenementsM.find({ zone: req.query.id })
        .then(evenement => res.status(200).json(evenement))
        .catch((error: ResponseError) => res.status(404).json(error))
      break
    }
    case 'enclos': {
      EvenementsM.find({ enclos: req.query.id })
        .then(evenement => res.status(200).json(evenement))
        .catch((error: ResponseError) => res.status(404).json(error))
      break
    }
    case 'espece': {
      EvenementsM.find({ espece: req.query.id })
        .then(evenement => res.status(200).json(evenement))
        .catch((error: ResponseError) => res.status(404).json(error))
      break
    }
    case 'animal': {
      EvenementsM.find({ animal: req.query.id })
        .then(evenement => res.status(200).json(evenement))
        .catch((error: ResponseError) => res.status(404).json(error))
      break
    }
    case 'type': {
      EvenementsM.find({ type: req.query.id })
        .then(evenement => res.status(200).json(evenement))
        .catch((error: ResponseError) => res.status(404).json(error))
      break
    }
  }
}
