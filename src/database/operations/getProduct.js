const { MongoClient, ObjectId } = require("mongodb");

async function getProduct(param) {
  const client = new MongoClient(process.env.DBURI);

  try {
    await client.connect();

    const database = client.db("products");
    const collection = database.collection("products");

    const result = await collection.findOne({ _id: new ObjectId(param.id) });

    return result;
  } catch (error) {
    console.log("Erro ao buscar produto: ", error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = getProduct;
