const express = require('express');
const { getItemController, addItemController, editItemController, deleeteItemController } = require('../controllers/itemController');

const router = express.Router();

router.get('/get-item', getItemController)
router.post('/add-item', addItemController)
router.put('/edit-item', editItemController)
router.delete('/delete-item/:id', deleeteItemController)

module.exports = router;