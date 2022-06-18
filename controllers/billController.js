const billModel = require('../models/billModel');

const addBillController = async (req, res) => {
    try {
        const newBill = new billModel(req.body);
        console.log(req.body)
        await newBill.save();
        res.status(201).send('Bill Added Successfully')
    } catch (error) {
        res.status(400).send(error)
    }
}

const getBillController = async (req, res) => {
    try {
        const items = await billModel.find();
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = { addBillController, getBillController }