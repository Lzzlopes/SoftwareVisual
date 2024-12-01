// models/cart.js


const Sequelize = require('sequelize');
const CartItem = require('./cartItem');


module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        cartId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        valorTotal: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
    });

    Cart.associate = (models) => {
        Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'items' });
        Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };


    return Cart;
}
