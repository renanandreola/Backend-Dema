const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const AdminSchema = require("../Schemas/Admin");
const md5 = require("md5");

const Admin = mongoose.model("Admin", AdminSchema);

async function insertAdmin(newAdmin) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.DBURI);

    try {
      await client.connect();

      let admin = new Admin(newAdmin);

      const database = client.db("adminDema");
      const collection = database.collection("adminDema");

      admin.password = md5(admin.password);

      const result = await collection.insertOne(admin);

      resolve(result);
    } catch (error) {
      console.log("Error on save admin: ", error);
      reject(error);
    } finally {
      await client.close();
    }
  });
}

module.exports = insertAdmin;
