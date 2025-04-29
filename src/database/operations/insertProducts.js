const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const ProductsSchema = require("../Schemas/Products");

const Products = mongoose.model("Products", ProductsSchema);

async function insertProducts(newProduct) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      let product = new Products(newProduct);

      const database = client.db("products");
      const collection = database.collection("products");

      const result = await collection.insertOne(product);

      resolve(result);
    } catch (error) {
      console.log("Error on save product: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = insertProducts;
