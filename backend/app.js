var express = require('express');//Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Importando o Sequelize
var sequelize = require('./models').sequelize;
// var User = require('./models/user')(sequelize);

var indexRouter = require('./routes/index');//Para a rota principal do app
var usersRouter = require('./routes/users');//Para a rota users ./routes/users.js
var productsRouter = require('./routes/products');//Para a rota products ./routes/products.js
var cartRouter = require('./routes/cart'); // para a rota cart ./routes/cart.js
var paymentRouter = require('./routes/payment');
var supplierRouter = require('./routes/supplier');

var app = express();//Ativa a API com o Express

app.use(logger('dev'));
app.use(express.json()); //Permite o uso de JSon
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/', indexRouter);//Cria a rota app/
app.use('/users', usersRouter);//Cria a rota app/users
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/payment', paymentRouter);
app.use('/suppliers', supplierRouter);

// Sincronizando o Sequelize (em dev)
//Instanciar o banco de dados

const db = require('./models');

async function applyDataStructure(){
    await db.sequelize.sync({force: true});
}

applyDataStructure();
// if (process.env.NODE_ENV !== 'production') {
//     sequelize.sync({ force: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
//         .then(() => {
//             console.log('Banco de dados sincronizado');
//         })
//         .catch(err => {
//             console.error('Erro ao sincronizar o banco de dados:', err);
//         });
// }

//Inciar o servidor com o app.js na porta 8080
const port = 8080;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});
module.exports = app;
