// models/product.js
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Product  = sequelize.define('Product', {
        productId:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome:{
            type: Sequelize.STRING,
            allowNull:false,
            unique: true,
        },
        descricao:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        preco:{
            type: Sequelize.FLOAT,
            allowNull:false,
        },
        estoque:{
            type: Sequelize.INTEGER,
            allowNull:false,
        }
    });

    Product.associate = function(models) {
        Product.hasMany(models.CartItem, {foreignKey: 'productId'});
    }

    return Product;
};