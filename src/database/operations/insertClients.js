const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const ClientsSchema = require("../../database/Schemas/Clients");

const Clients = mongoose.model("Clients", ClientsSchema);

async function insertClients(newClient) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      let user = new Clients(newClient);

      const database = client.db("clients");
      const collection = database.collection("clients");

      const result = await collection.insertOne(user);

      resolve(result);
    } catch (error) {
      console.log("Error on save user: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = insertClients;
