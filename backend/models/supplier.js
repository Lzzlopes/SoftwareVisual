// models/client.js
const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const Supplier = sequelize.define('Supplier', {
        supplierId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        cnpj: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
        },
        password: {
                type: Sequelize.STRING,
                allowNull: false
        },
    },

        {
        timestamps: false,
    });

    return Supplier;
};