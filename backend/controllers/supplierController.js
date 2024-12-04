// ./controllers/supplierController.js

class SupplierController{
    constructor(SupplierService){
        this.supplierService = SupplierService;
    }
    async createSupplier(req, res) {
        try {
            const { email, password, cnpj } = req.body;
            const newSupplier = await this.supplierService.create(email, password, cnpj);
            res.status(200).json(newSupplier);
        } catch (error) {
            console.error("Erro ao criar fornecedor:", error);  // Log detalhado
            res.status(500).json({ error: 'Ocorreu um erro ao gravar o novo fornecedor.', details: error.message });
        }
    }


    async findAllSuppliers(req,res){
        try{
            const AllSupplier = await this.supplierService.findAll();
            res.status(200).json(AllSupplier);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os usuários.'});
        }
    }

    async findSupplierById(req,res){
        const {id} = req.query;
        try{
            const Supplier = await this.supplierService.findById(id);
            res.status(200).json(Supplier);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar os usuário pelo ID.'});
        }

    }

    //Método para login
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const Supplier = await this.supplierService.login(email, password);
            res.status(200).json(Supplier);
        } catch (err) {
            console.error('Erro no login:', err.message); // Log mais detalhado
            res.status(500).json({ error: 'Ocorreu um erro ao tentar fazer login.', details: err.message });
        }
    }

}

module.exports = SupplierController;