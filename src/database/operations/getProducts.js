const { MongoClient } = require('mongodb');
const ACCESS_DB = require('../../config/envDB')

const URI = "mongodb+srv://" + ACCESS_DB.DB_Credentials.Username + ":" + ACCESS_DB.DB_Credentials.Password + "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(URI, { useUnifiedTopology: true });
        await client.connect();
    }
    return client.db('products');
}

async function getProducts() {
    try {
        const database = await connectToDatabase();
        const collectionProducts = database.collection('products');
        const result = await collectionProducts.find().toArray();
        return result;
    } catch (error) {
        console.log('Error on get products: ', error);
        throw error;
    }
}

module.exports = getProducts;
