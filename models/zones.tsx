import { model, models, Schema } from 'mongoose'
import Zones from 'Types/Zones'
import uniqueValidator from 'mongoose-unique-validator'

const zonesSchema = new Schema<Zones>({
  _id: { type: String, required: true, unique: true },
  nom: { type: String, required: true }
})

zonesSchema.plugin(uniqueValidator)

export default models.ZoneM || model<Zones>('ZoneM', zonesSchema)
