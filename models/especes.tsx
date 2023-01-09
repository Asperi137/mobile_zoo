import { model, models, Schema } from 'mongoose'
import Especes from 'Types/Especes'
import uniqueValidator from 'mongoose-unique-validator'

const especesSchema = new Schema<Especes>({
  _id: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  sociable: { type: Boolean, required: true },
  observations: { type: String, required: true },
  dangereux: { type: Boolean, required: true },
  enclos: { type: String, required: true }
})
especesSchema.plugin(uniqueValidator)
export default models.EspeceM || model<Especes>('EspeceM', especesSchema)
