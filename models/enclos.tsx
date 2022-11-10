const mongoose = require('mongoose');

const enclosSchema = mongoose.Schema({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
  zone: { type: String, required: true },
  coordonnées: { type: String, required: true },
  superficie: { type: Number, required: true }
});

export default mongoose.model('Enclos', enclosSchema);