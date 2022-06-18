const express = require('express');
const { addBillController, getBillController } = require('../controllers/billController.js');

const router = express.Router();

router.get('/get-bill', getBillController)

router.post('/add-bill', addBillController)


module.exports = router;