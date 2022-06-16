const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const connectDb = require('./config/config');
const itemRoutes = require('./routes/itemRoutes')

dotenv.config();
connectDb();

// rest object
const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

//routes
app.use('/api/items', itemRoutes)

//PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Sever running on Port: ${PORT}`);
});