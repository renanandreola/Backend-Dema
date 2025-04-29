const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.DBURI, {
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
