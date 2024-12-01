// ./services/userService.js

const db = require("../models");
const res = require("express/lib/response");
const auth = require("../auth");
const bcrypt = require('bcrypt');
var round_salts = 10;

class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    async create(email, data_nasc, password){
        try{
            const hashpassword = await bcrypt.hash(password, round_salts)
            const newUser = await this.User.create({
                email:email,
                data_nasc:data_nasc,
                password:hashpassword
            });
            return newUser? newUser : null;
            
        }
        catch (error){
            throw error;
        }
    }

    //Método para retornar todos os usuários
    async findAll()
    {
        try{
            const AllUsers = await this.User.findAll();
            return AllUsers? AllUsers : null;
        }
        catch(error){
            throw error;
        }
    }

    //Método para retornar o usuário pelo id
    async findById(id){
        try{
            const User = await this.User.findByPk(id);
            return User ? User : null;
        }
        catch(err){
            throw err;
        }
    }

    //Método para login
    async login(email, password) {
        try {
            const User = await this.User.findOne({
                where: { email }
            });

            if (User) {
                // Comparar a senha
                const isPasswordCorrect = await bcrypt.compare(password, User.password);

                if (isPasswordCorrect) {
                    // Gerar o token do user
                    User.dataValues.Token = await auth.generateToken(User);
                    User.dataValues.password = ''; // Remover senha
                    return User;
                } else {
                    throw new Error('Credenciais inválidas (senha incorreta)');
                }
            } else {
                throw new Error('Credenciais inválidas (usuário não encontrado)');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;