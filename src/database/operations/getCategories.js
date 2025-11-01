const { MongoClient } = require("mongodb");

async function getCategories() {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      const database = client.db("categories");
      const collection = database.collection("categories");

      const categories = await collection.find({}).toArray();

      resolve(categories);
    } catch (error) {
      console.log("Error on getCategories:", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = getCategories;
