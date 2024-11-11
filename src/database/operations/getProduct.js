const { MongoClient, ObjectId } = require("mongodb");
const ACCESS_DB = require("../../config/envDB");

const URI =
  "mongodb+srv://" +
  ACCESS_DB.DB_Credentials.Username +
  ":" +
  ACCESS_DB.DB_Credentials.Password +
  "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

async function getProduct(param) {
  const client = new MongoClient(URI);

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
