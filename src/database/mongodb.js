const { MongoClient, ServerApiVersion } = require("mongodb");
const ACCESS_DB = require("../config/envDB");

const uri =
  "mongodb+srv://" +
  ACCESS_DB.DB_Credentials.Username +
  ":" +
  ACCESS_DB.DB_Credentials.Password +
  "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

const databaseConn = async () => {
  try {
    await client
      .connect()
      .then(() => {
        console.log("Connected successfully to MongoDB");
      })
      .catch((err) => {
        console.log("Error on connect to MongoDB: ", err);
      });
  } catch (err) {
    client.close();
    console.log("Error on connect database: ", err);
  }
};

module.exports = databaseConn;
