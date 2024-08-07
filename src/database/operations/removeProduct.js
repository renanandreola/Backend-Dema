const { MongoClient, ObjectId } = require('mongodb');
const ACCESS_DB = require('../../config/envDB');

const URI = "mongodb+srv://" + ACCESS_DB.DB_Credentials.Username + ":" + ACCESS_DB.DB_Credentials.Password + "@demacluster.9yaczoz.mongodb.net/Dema_Database?retryWrites=true&w=majority";

async function removeProduct(id) {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            
            const database = client.db('products');
            const collection = database.collection('products');

            const objectId = new ObjectId(id);

            const result = await collection.deleteOne({ _id: objectId });
            
            resolve(result);

        } catch (error) {
            console.log('Erro ao remover produto: ', error);
            reject(error);

        } finally {
            await client.close();
        }
    });
}

module.exports = removeProduct;