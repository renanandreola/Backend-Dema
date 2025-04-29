const { MongoClient, ObjectId } = require("mongodb");

async function removeClient(id) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("clients");
      const collection = database.collection("clients");

      const objectId = new ObjectId(id);

      const result = await collection.deleteOne({ _id: objectId });

      resolve(result);
    } catch (error) {
      console.log("Erro ao remover cliente: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = removeClient;
