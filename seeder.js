const mongoose = require('mongoose');
const dotenv = require('dotenv')
const connectDb = require('./config/config');
const itemModel = require('./models/itemModel')
const items = require('./utils/data')

dotenv.config()
connectDb()

const importData = async () => {
    try {
        await itemModel.deleteMany();
        const itemsData = await itemModel.insertMany(items)
        console.log('items added');
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

importData();