// models/Payment.js

const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const Payment = sequelize.define('Payment',{
        paymentId:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        valorTotal:{
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
        },
        metodoPagamento:{
            type: Sequelize.ENUM('cartão de crédito', 'PIX'),
            allowNull:false
        },
        status:
            {
                type: Sequelize.ENUM('pendente', 'concluído', 'falhado'),
            }    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Payment;
};