const { MongoClient } = require("mongodb");

async function getProducts() {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("products");
      const collectionProducts = database.collection("products");

      const result = await collectionProducts.find().toArray();

      resolve(result);
    } catch (error) {
      console.log("Error on get products: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = getProducts;
