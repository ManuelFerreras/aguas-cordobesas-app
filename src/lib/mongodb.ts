import mongoose from "mongoose";

const connection: any = {} /* creating connection object*/
const connectionUrl = process.env.MONGODB_URI || ''

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(connectionUrl)

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect