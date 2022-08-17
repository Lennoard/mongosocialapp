require('dotenv').config()
const { MongoClient } = require("mongodb");

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASS;
const clusterUrl = process.env.CLUSTER_URL;
const uri = `mongodb+srv://${user}:${pass}@${clusterUrl}/?retryWrites=true&writeConcern=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
