const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const CategorySchema = require("../Schemas/Category");

const Category = mongoose.model("Category", CategorySchema);

async function createCategory(newCategory) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      let category = new Category({
        name: newCategory.name,
        parent: newCategory.parent || null,
      });

      const database = client.db("categories");
      const collection = database.collection("categories");

      const result = await collection.insertOne(category);

      resolve(result);
    } catch (error) {
      console.log("Error on save category: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = createCategory;
