import { model, models, Schema } from 'mongoose'
import Enclos from '../Types/Enclos'

const enclosSchema = new Schema<Enclos>({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
  zone: { type: String, required: true },
  coordonnées: { type: String, required: true },
  superficie: { type: Number, required: true }
})

export default models.EnclosM || model<Enclos>('EnclosM', enclosSchema)
