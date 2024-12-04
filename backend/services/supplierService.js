// ./services/userService.js

const db = require("../models");
const auth = require("../auth");
const bcrypt = require('bcrypt');
const round_salts = 10;

class SupplierService {
    constructor(SupplierModel) {
        this.Supplier = SupplierModel;
    }

    // Método para criar um fornecedor
    async create(email, password, cnpj) {
        try {
            const hashpassword = await bcrypt.hash(password, round_salts);
            const newSupplier = await this.Supplier.create({
                email: email,
                password: hashpassword,
                cnpj: cnpj,
            });
            return newSupplier ? newSupplier : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar todos os fornecedores
    async findAll() {
        try {
            const allSuppliers = await this.Supplier.findAll();
            return allSuppliers ? allSuppliers : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar o fornecedor pelo id
    async findById(id) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            return supplier ? supplier : null;
        } catch (err) {
            throw err;
        }
    }

    // Método para login
    async login(email, password) {
        try {
            const supplier = await this.Supplier.findOne({ where: { email } });
            if (supplier) {
                console.log('Senha fornecida:', password);
                console.log('Senha armazenada:', supplier.password);

                const isPasswordCorrect = await bcrypt.compare(password, supplier.password);
                console.log('Senha correta?', isPasswordCorrect); // Log para verificar a comparação

                if (isPasswordCorrect) {
                    // Gerar o token
                    supplier.dataValues.Token = await auth.generateToken(supplier);
                    supplier.dataValues.password = ''; // Remover a senha antes de retornar
                    supplier.dataValues.isSupplier = true;
                    return supplier;
                } else {
                    throw new Error('Credenciais inválidas (senha incorreta)');
                }
            } else {
                throw new Error('Credenciais inválidas (fornecedor não encontrado)');
            }
        } catch (error) {
            console.error('Erro de login:', error.message);
            throw error;
        }
    }
}

module.exports = SupplierService;
