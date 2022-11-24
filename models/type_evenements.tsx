import { model, models, Schema } from 'mongoose'
import Type_evenements from 'Types/Type_evenements'

const type_evenementsSchema = new Schema<Type_evenements>({
  _id: { type: String, required: true },
  nom: { type: String, required: true }
})

export default models.Type_evenementsM ||
  model<Type_evenements>('Type_evenementsM', type_evenementsSchema)
