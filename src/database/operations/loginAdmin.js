const { MongoClient } = require("mongodb");
const ACCESS_DB = require("../../config/envDB");
const md5 = require("md5");

const URI =
  "mongodb+srv://" +
  ACCESS_DB.DB_Credentials.Username +
  ":" +
  ACCESS_DB.DB_Credentials.Password +
  "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

async function loginAdmin(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(URI);

    try {
      await client.connect();

      const database = client.db("adminDema");
      const collection = database.collection("adminDema");

      const result = await collection.findOne({
        email: loginInfo.email,
        password: md5(loginInfo.password),
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

module.exports = loginAdmin;
