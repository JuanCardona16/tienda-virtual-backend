import mongoose from 'mongoose'

// Funcion para realizar la conección a nuestra base de datos no relacional de mongoDB
// Para este proyecto utilizaremos mongoDB Atlas, que es en la nube.
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DATABASE);
    console.log(">>> Database is connect sucessfull!")
  } catch(error) {
    console.log(">>> Database is not connect sucessfull!. \n The error is. " + error)
  }
} 