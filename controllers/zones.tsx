import { NextApiRequest, NextApiResponse } from 'next/types'
import ResponseError from '../Types/ResponseError'
import Zones from '../Types/Zones'
import ZoneM from '../models/zones'

export function createZone (
  req: NextApiRequest,
  res: NextApiResponse<Zones[] | Zones | ResponseError>
) {
  const zone = new ZoneM({
    ...req.body
  })
  zone
    .save()
    .then(() => res.status(201).json({ message: 'Zone ajoutée' }))
    .catch((error: ResponseError) => res.status(400).json(error))
  console.log(res.statusMessage)
}

export function modifyZone (
  req: NextApiRequest,
  res: NextApiResponse<Zones | ResponseError>
) {
  ZoneM.updateOne({ _id: req.query.id }, { ...req.body, _id: req.query.id })
    .then(() => res.status(202).json({ message: 'Zone modifiée' }))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function deleteZone (
  req: NextApiRequest,
  res: NextApiResponse<Zones | ResponseError>
) {
  ZoneM.deleteOne({ _id: req.query.id })
    .then(() => res.status(410).json({ message: 'Zone supprimée' }))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function getOneZone (
  req: NextApiRequest,
  res: NextApiResponse<Zones | ResponseError>
) {
  ZoneM.findOne({ _id: req.query.id })
    .then(zone => res.status(200).json(zone))
    .catch((error: ResponseError) => res.status(404).json(error))
}

export function getZones (
  req: NextApiRequest,
  res: NextApiResponse<Zones[] | Zones | ResponseError>
) {
  ZoneM.find()
    .then(zones => res.status(200).json(zones))
    .catch((error: ResponseError) => res.status(400).json(error))
}
