const itemModel = require('../models/itemModel');

const getItemController = async (req, res) => {
    try {
        const items = await itemModel.find();
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
}

const addItemController = async (req, res) => {
    try {
        const newItem = new itemModel(req.body);
        await newItem.save();
        res.status(201).send('Item Created Successfully')
    } catch (error) {
        res.status(400).send(error)
    }
}

const editItemController = async (req, res) => {
    try {
        const { itemId } = req.body;
        await itemModel.findOneAndUpdate({ _id: itemId }, req.body);
        res.status(201).json("item Updated");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}

const deleeteItemController = async (req, res) => {
    try {
        // console.log(req.params)
        const { id: _id } = req.params;
        // console.log("itemId: ", _id)
        await itemModel.findByIdAndRemove(_id);
        res.status(201).json("item Deleted");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}

module.exports = { getItemController, addItemController, editItemController, deleeteItemController }