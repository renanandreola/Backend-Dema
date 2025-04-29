const { MongoClient } = require("mongodb");

async function loginClients(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

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
