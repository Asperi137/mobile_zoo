import mongoose from 'mongoose'

const especesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
  sociable: { type: Boolean, required: true },
  observation: { type: String, required: false },
  dangereux: { type: Boolean, required: true },
  enclos: { type: String, required: true }
});

export default  mongoose.model('Especes', especesSchema);