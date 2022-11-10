import mongoose from 'mongoose'

const animauxSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
  espece: { type: String, required: true },
  naissance: { type: Date, required: false },
  deces: { type: Date, required: false },
  sexe: { type: String, required: false },
  observation: { type: String, required: false },
  position: { type: String, required: true }
});

export default  mongoose.model('Animaux', animauxSchema);