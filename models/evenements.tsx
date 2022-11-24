import { model, models, Schema } from 'mongoose'
import Evenements from 'Types/Evenements'
import uniqueValidator from 'mongoose-unique-validator'
import { timeStamp } from 'console'

const evenementSchema = new Schema<Evenements>(
  {
    _id: { type: String, required: true, unique: true },
    createur: { type: String, required: true },
    animal: { type: String },
    espece: { type: String },
    enclos: { type: String },
    zone: { type: String },
    type: { type: String, required: true },
    observations: { type: String },
    createdAt: { type: Date }
  },
  { timestamps: true }
)
evenementSchema.plugin(uniqueValidator)
export default models.EvenementsM ||
  model<Evenements>('EvenementsM', evenementSchema)
