import mongoose from 'mongoose'

const zonesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
});

export default  mongoose.model('Zone', zonesSchema);