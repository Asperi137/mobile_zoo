import { model, models, Schema } from 'mongoose'
import User from '../Types/User'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema<User>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)

export default models.UserM || model<User>('UserM', userSchema)
