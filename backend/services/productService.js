// ./services/productService.js

const db = require('../models');
const res = require("express/lib/response");


class ProductService {
    constructor(ProductModel){
        this.Product = ProductModel;
    }

    async create(nome, descricao, preco, estoque){
        try{
            const newProduct = await this.Product.create({
                nome : nome,
                descricao : descricao,
                preco : preco,
                estoque : estoque
            });
            return newProduct? newProduct : null;
        }
        catch (error){
            throw error;
        }
    }
    async findAll(){
        try{
            const allProducts = await this.Product.findAll();
            return allProducts ? allProducts : null;
        }
        catch(error){
            throw error;
        }
    }

    async findById(id){
        try{
            const Product = await this.Product.findByPk(id);
            return Product ? Product : null;
        }
        catch(err){
            throw err;
        }
    }

    async update(oldId, nome, descricao, preco, estoque){
        try{
            const product = await this.Product.findByPk(oldId);
             await product.update(
                {
                nome : nome,
                descricao : descricao,
                preco : preco,
                estoque : estoque
            });
            return product ? product : null;
        }
        catch (error){
            throw error;
        }
    }

    async delete(id){
        try{
            const product = await this.Product.findByPk(id);
            await product.destroy();
            return product;
        }
        catch (error){
            throw error;
        }
    }


}

module.exports = ProductService;