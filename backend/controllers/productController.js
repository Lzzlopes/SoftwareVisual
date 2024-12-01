// ./controllers/productController.js

class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    async createProduct(req, res) {
        try{
            const {nome, descricao, preco, estoque} = req.body;
            const newProduct = await this.productService.create(nome, descricao, preco, estoque);
            res.status(200).json(newProduct);
        }
        catch (error){
            console.log(error);
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao gravar novo produto.' });
        }
    }

    async findAll(req,res){
        try{
            const AllProducts = await this.productService.findAll();
            res.status(200).json(AllProducts);
        }
        catch(error){
            console.log(error);
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao listar todos os produtos.'});
        }
    }

    async findProductById(req,res){
        const {id} = req.params;
        try{
            const User = await this.productService.findById(id);
            res.status(200).json(User);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar o produto pelo ID.'});
        }

    }

    async updateProduct(req,res){
        try{
            const {id} = req.params;
            const {nome, descricao, preco, estoque} = req.body;
            this.productService.update(id, nome, descricao, preco, estoque);
            res.status(200).json('Produto atualizado com sucesso');
        }
        catch (error){
            console.log(error);
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao atualizar produto.'});
        }
    }

    async deleteProduct(req,res){
        try{
            const {id} = req.params;
            this.productService.delete(id);
            res.status(200).json("Produto deletado com sucesso!");
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao deletar o produto.'});
        }
    }



}

module.exports = ProductController;