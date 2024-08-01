const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const ACCESS_DB = require('../../config/envDB')
const ProductsSchema = require('../Schemas/Products');

const URI = "mongodb+srv://" + ACCESS_DB.DB_Credentials.Username + ":" + ACCESS_DB.DB_Credentials.Password + "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

const Products = mongoose.model('Products', ProductsSchema);

async function insertProducts(newProduct) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(URI);

        try {
            await client.connect();

            let product = new Products(newProduct);
            
            const database = client.db('products');
            const collection = database.collection('products');

            const result = await collection.insertOne(product);
            
            resolve(result);

        } catch (error) {
            console.log('Error on save product: ', error);
            reject(error);

        } finally {
            await client.close();
        }
    });
}

module.exports = insertProducts;