const { MongoClient } = require('mongodb');
const ACCESS_DB = require('../../config/envDB')

const URI = "mongodb+srv://" + ACCESS_DB.DB_Credentials.Username + ":" + ACCESS_DB.DB_Credentials.Password + "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

async function getProducts() {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(URI, { 
            useUnifiedTopology: true
        });

        try {
            await client.connect();
            
            const database = client.db('products');
            const collectionProducts = database.collection('products');

            const result = await collectionProducts.find().toArray();
   
            resolve(result);

        } catch (error) {
            console.log('Error on get products: ', error);
            reject(error);

        } finally {
            await client.close();
        }
    });
}

module.exports = getProducts;