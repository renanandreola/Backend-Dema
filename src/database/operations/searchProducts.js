const { MongoClient } = require("mongodb");

async function searchProducts(searchTerm) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("products");
      const collectionProducts = database.collection("products");

      const query = searchTerm;
      let queryObj = {};
      let cond = [];

      if (query && query.length > 0) {
        queryObj = {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { code: { $regex: query, $options: "i" } },
          ],
        };
      }

      const products = await collectionProducts
        .find(queryObj)
        .sort(cond)
        .toArray();

      resolve(products);
    } catch (error) {
      console.log("Error at search products: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = searchProducts;
