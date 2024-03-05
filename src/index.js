const express = require('express');
const router = require('./routes/v1');
const connectDB = require('./db');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./apidocs.yaml');


connectDB()

app.use(express.json()); // for parsing application/json  
 
app.use("/api/v1", router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("Server started on port 3000");
})