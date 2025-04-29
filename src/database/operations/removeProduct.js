const { MongoClient, ObjectId } = require("mongodb");

async function removeProduct(id) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("products");
      const collection = database.collection("products");

      const objectId = new ObjectId(id);

      const result = await collection.deleteOne({ _id: objectId });

      resolve(result);
    } catch (error) {
      console.log("Erro ao remover produto: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = removeProduct;
