var express = require('express');
var router = express.Router();
const auth = require('../auth'); //Carregar os objetos do auth.js

//Implementar as dependencias para o funcionamento da classe User
const db =require('../models') // carregando o banco de dados

//Carregando as classes service e controller da user
const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

//Construir os objetos a partir das classes
const cartService = new CartService(db.Cart);
const cartController = new CartController(cartService);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Módulo do carrinho rodando.');
});

router.post('/add/:userId', async(req,res)=>{
    await cartController.addProduct(req,res);
})

router.delete('/remove/:userId', async(req,res)=>{
    await cartController.removeProduct(req,res);
})

router.get('/getall/:userId', async(req,res)=>{
    await cartController.viewCart(req,res);
})

module.exports = router;