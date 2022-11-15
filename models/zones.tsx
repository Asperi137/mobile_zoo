import { model, models, Schema } from 'mongoose'
import Zones from '../Types/Zones'

const zonesSchema = new Schema<Zones>({
  _id: { type: String, required: true },
  nom: { type: String, required: true }
})

export default models.ZoneM || model<Zones>('ZoneM', zonesSchema)
