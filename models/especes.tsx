import { model, models, Schema } from 'mongoose'
import Especes from '../Types/Especes'

const especesSchema = new Schema<Especes>({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
  sociable: { type: Boolean, required: true },
  observations: { type: String, required: true },
  dangereux: { type: Boolean, required: true },
  enclos: { type: String, required: true }
})

export default models.Especes || model<Especes>('Espece', especesSchema)
