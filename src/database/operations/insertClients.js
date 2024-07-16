const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const ACCESS_DB = require('../../config/envDB')
const ClientsSchema = require('../../database/Schemas/Clients');

const URI = "mongodb+srv://" + ACCESS_DB.DB_Credentials.Username + ":" + ACCESS_DB.DB_Credentials.Password + "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

const Clients = mongoose.model('Clients', ClientsSchema);

async function insertClients(newClient) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(URI, { 
            useUnifiedTopology: true
        });

        try {
            await client.connect();

            let user = new Clients(newClient);
            
            const database = client.db('clients');
            const collection = database.collection('clients');

            const result = await collection.insertOne(user);
            
            resolve(result);

        } catch (error) {
            console.log('Error on save user: ', error);
            reject(error);

        } finally {
            await client.close();
        }
    });
}

module.exports = insertClients;