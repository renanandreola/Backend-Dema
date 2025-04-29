const { MongoClient } = require("mongodb");

async function getClients() {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("clients");
      const collectionProducts = database.collection("clients");

      const result = await collectionProducts.find().toArray();

      resolve(result);
    } catch (error) {
      console.log("Error on get clients: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = getClients;
