import { model, models, Schema } from 'mongoose'
import Enclos from 'Types/Enclos'
import uniqueValidator from 'mongoose-unique-validator'

const enclosSchema = new Schema<Enclos>({
  _id: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  zone: { type: String, required: true },
  coordonnées: { type: String, required: true },
  superficie: { type: Number, required: true }
})

enclosSchema.plugin(uniqueValidator)

export default models.EnclosM || model<Enclos>('EnclosM', enclosSchema)
