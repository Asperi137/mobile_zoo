import { NextApiRequest, NextApiResponse } from 'next/types'
import ResponseError from 'Types/ResponseError'
import Type_evenementsM from 'models/type_evenements'
import Type_evenements from 'Types/Type_evenements'

export function getTypeEvenements (
  req: NextApiRequest,
  res: NextApiResponse<Type_evenements[] | Type_evenements | ResponseError>
) {
  Type_evenementsM.find()
    .then(Type_evenements => res.status(200).json(Type_evenements))
    .catch((error: ResponseError) => res.status(400).json(error))
}
export function getOneTypeEvenements (
  req: NextApiRequest,
  res: NextApiResponse<Type_evenements | ResponseError>
) {
  Type_evenementsM.findOne({ _id: req.query.id })
    .then(Type_evenements => res.status(200).json(Type_evenements))
    .catch((error: ResponseError) => res.status(400).json(error))
}
