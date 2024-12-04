var express = require('express');
var router = express.Router();
const auth = require('../auth'); //Carregar os objetos do auth.js

//Implementar as dependencias para o funcionamento da classe User
const db =require('../models') // carregando o banco de dados

//Carregando as classes service e controller da user
const SupplierService = require('../services/supplierService');
const SupplierController = require('../controllers/supplierController');

//Construir os objetos a partir das classes
const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Módulo de fornecedores rodando.');
});

//Rota para login
router.post('/login', async(req,res)=>{
    await supplierController.login(req, res);
});

// Rota para criar um novo fornecedor
router.post('/createSupplier', async (req, res) => {
    await supplierController.createSupplier(req, res);
});

//Rota para retornar todos os fornecedores
router.get('/allusers'/*, auth.verifyToken*/, async(req,res)=>{
    await supplierController.findAllSuppliers(req, res);
});

//Rota para retonar um fornecedor pelo id
router.get('/getUserById', async (req,res)=>{
    await supplierController.findSupplierById(req, res);
});


module.exports = router;
