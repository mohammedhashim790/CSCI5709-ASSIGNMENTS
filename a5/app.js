const express = require('express');

const dotenv = require('dotenv');
dotenv.config();


const {connectDB} = require("./config/db");
connectDB();


const app = express();

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');


app.use(express.json());

app.use('/api/auth', authRoutes.auth_router);
app.use('/api/products', productRoutes.router);

app.get('/' , (req, res) => res.status(200).send('Hello World!'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

