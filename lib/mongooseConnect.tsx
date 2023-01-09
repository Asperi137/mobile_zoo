import mongoose from 'mongoose'

export default function mongooseConnect () {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
  }
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(error => console.log('Connexion à MongoDB échouée !' + error))
}
