// models/cartItem.js

const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        cartItemId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cartId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts',
                key: 'cartId'
            }
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'productId'
            }
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        precoTotal: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
        CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product', onDelete: 'CASCADE' });
    };

    CartItem.beforeCreate((cartItem, options) => {
        return sequelize.models.CartItem.max('cartItemId', { where: { cartId: cartItem.cartId } })
            .then(maxCartItemId => {
                if (maxCartItemId) {
                    cartItem.cartItemId = maxCartItemId + 1;
                } else {
                    cartItem.cartItemId = 1;
                }
            });
    });

    CartItem.afterCreate((cartItem, options) => {
        updateCartTotal(cartItem.cartId);
    });

    CartItem.afterUpdate((cartItem, options) => {
        updateCartTotal(cartItem.cartId);
    });

    CartItem.afterDestroy((cartItem, options) => {
        sequelize.models.Cart.findByPk(cartItem.cartId)
            .then(cart => {
                sequelize.models.CartItem.findAll({ where: { cartId: cart.cartId } })
                    .then(items => {
                        cart.valorTotal = items.reduce((total, item) => total + item.precoTotal, 0);
                        cart.save();

                        items.forEach((item, index) => {
                            sequelize.models.CartItem.update({ cartItemId: index + 1 }, { where: { cartItemId: item.cartItemId } })
                                .then(() => {
                                    console.log(`cartItemId atualizado para ${index + 1}`);
                                });
                        });
                    });
            });
    });

    function updateCartTotal(cartId) {
        sequelize.models.CartItem.findAll({ where: { cartId: cartId } })
            .then(items => {
                const total = items.reduce((acc, item) => acc + item.precoTotal, 0);
                sequelize.models.Cart.update({ valorTotal: total }, { where: { cartId: cartId } });
            });
    }



    return CartItem;
}