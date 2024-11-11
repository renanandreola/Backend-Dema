const { MongoClient } = require("mongodb");
const ACCESS_DB = require("../../config/envDB");

const URI =
  "mongodb+srv://" +
  ACCESS_DB.DB_Credentials.Username +
  ":" +
  ACCESS_DB.DB_Credentials.Password +
  "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

async function loginClients(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(URI);

    try {
      await client.connect();

      const database = client.db("clients");
      const collection = database.collection("clients");

      const result = await collection.findOne({
        email: loginInfo.email,
      });

      resolve(result);
    } catch (error) {
      console.log("Erro ao realizar login: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = loginClients;
