var express = require('express');
var router = express.Router();

//Implementar as dependencias para o funcionamento da classe Product
const db = require('../models') // carregando o banco de dados

//Carergando as classes service e controller da product
const req = require("express/lib/request");
const res = require("express/lib/response");
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');
const auth = require("../auth");

//Construir os objetos a partir das classes
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Módulo de produtos rodando.');
});

//Rota para criar novo produto
router.post('/novoproduto', /*auth.verifyToken, */ async (req,res)=>{
    await productController.createProduct(req, res);
});

//Rota para listar todos os produtos
router.get('/allProducts', async(req,res)=>{
    await productController.findAll(req, res);
});

//Rota para atualizar produto
router.put('/atualizarproduto/:id', async (req,res)=>{
    await productController.updateProduct(req,res);
});

//Rota para apagar produto
router.delete('/deletar/:id', async (req,res)=>{
    await productController.deleteProduct(req,res);
});
router.get('/getProductById/:id', /*auth.verifyToken,*/ async (req,res)=>{
    await productController.findProductById(req, res);
});


module.exports = router;