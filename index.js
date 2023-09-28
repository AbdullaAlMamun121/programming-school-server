// Express.js simplifies the process of building web applications in Node.js by providing a set of tools and middleware for routing, handling HTTP requests, and more. To use Express, you first need to import it with require('express').
const express = require('express');
// The app object is the central part of your Express application. You'll use it to define routes, set up middleware, and specify how your server should respond to various types of HTTP requests (e.g., GET, POST, PUT). It acts as a container for all your application's routes and middleware.
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000 ;
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

// middleware 
app.use(cors(corsOptions));
// The line `app.use(express.json())` configures your Express.js application to automatically parse incoming JSON data from HTTP request bodies, making it accessible as a JavaScript object through `req.body`. This is essential for handling JSON data in requests, often used in RESTful APIs and modern web applications.
app.use(express.json);

// This function is a middleware in Express.js that adds CORS (Cross-Origin Resource Sharing) headers to HTTP responses. These headers allow requests from any origin (`*`), specify allowed HTTP methods (GET, POST, PUT, DELETE), and define accepted headers. The `next()` function passes control to the next middleware in the chain, allowing the application to handle requests with these CORS headers properly.

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Mongodb connection 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uetnypa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
    });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




