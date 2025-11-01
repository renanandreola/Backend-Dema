const { MongoClient, ObjectId } = require("mongodb");

async function getProducts(category) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("products");
      const collection = database.collection("products");

      let query = {};

    if (category) {
        if (ObjectId.isValid(category)) {
            // busca tanto por ObjectId quanto por string
            query = { categories: { $in: [new ObjectId(category), category] } };
        } else {
            // busca apenas por string
            query = { categories: { $in: [category] } };
        }
    }

      const result = await collection.find(query).toArray();
      resolve(result);
    } catch (error) {
      console.log("Error on getProducts:", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = getProducts;
