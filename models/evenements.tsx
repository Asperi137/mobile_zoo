import { model, models, Schema } from 'mongoose'
import Evenements from 'Types/Evenements'
import uniqueValidator from 'mongoose-unique-validator'

const evenementSchema = new Schema<Evenements>(
  {
    _id: { type: String, required: true, unique: true },
    createur: { type: String, required: true },
    animal: { type: String },
    espece: { type: String },
    enclos: { type: String },
    type: { type: String, required: true },
    observations: { type: String }
  },
  { timestamps: true }
)
evenementSchema.plugin(uniqueValidator)
export default models.EvenementsM ||
  model<Evenements>('EvenementsM', evenementSchema)
