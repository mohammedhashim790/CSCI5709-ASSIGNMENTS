const express = require('express');

const app = express();
const PORT = 3000;


const productRoutes = require('./products');


app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(PORT, (error) => {
    if (!error) console.log("Server is Successfully Running, and App is listening on port " + PORT); else console.log("Error occurred, server can't start", error);
});
