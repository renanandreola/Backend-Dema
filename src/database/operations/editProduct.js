const { MongoClient, ObjectId } = require("mongodb");

async function editProduct(params) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("products");
      const collection = database.collection("products");

      const result = await collection.updateOne(
        { _id: new ObjectId(params.editedId) },
        { $set: params.editedProduct }
      );

      if (result.matchedCount > 0) {
        resolve(result);
      } else {
        reject(new Error("Produto não encontrado para atualização"));
      }
    } catch (error) {
      console.log("Error on edit product: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = editProduct;
