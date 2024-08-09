const { MongoClient, ObjectId } = require('mongodb');
const ACCESS_DB = require('../../config/envDB');

const URI = "mongodb+srv://" + ACCESS_DB.DB_Credentials.Username + ":" + ACCESS_DB.DB_Credentials.Password + "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

async function editProduct(params) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(URI);

        try {
            await client.connect();

            const database = client.db('products');
            const collection = database.collection('products');

            const result = await collection.updateOne(
                { _id: new ObjectId(params.editedId) },
                { $set: params.editedProduct }
            );
            
            if (result.matchedCount > 0) {
                resolve(result);
            } else {
                reject(new Error("Produto não encontrado para atualização"));
            }

        } catch (error) {
            console.log('Error on edit product: ', error);
            reject(error);

        } finally {
            await client.close();
        }
    });
}

module.exports = editProduct;
