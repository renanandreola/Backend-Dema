const { MongoClient } = require("mongodb");
const md5 = require("md5");

async function loginAdmin(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

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
