var express = require('express');
var router = express.Router();

//Implementar as dependencias para o funcionamento da classe Product
const db = require('../models') // carregando o banco de dados

//Carergando as classes service e controller da product
const req = require("express/lib/request");
const res = require("express/lib/response");
const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');

//Construir os objetos a partir das classes
const paymentService = new PaymentService(db.Payment);
const paymentController = new PaymentController(paymentService);

/* GET payment listing. */
router.get('/', function(req, res, next) {
    res.send('Módulo de pagamento rodando.');
});

//Rota para realizar pagamento via PIX
router.post('/pix', async (req,res)=>{
    await paymentController.payWithPix(req, res);
});

//Rota para realizar pagamento via cartão de crédito
router.post('/credit-card', async(req,res)=>{
    await paymentController.payWithCreditCard(req, res);
});

//Rota para consultar transação
router.get('/status/:paymentId', async (req,res)=>{
    await paymentController.getPaymentStatus(req,res);
});

module.exports = router;