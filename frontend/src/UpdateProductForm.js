import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UpdateProductDataForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [productId, setProductId] = useState(''); // ID do produto que o usuário quer buscar

    // Tratar o evento change dos campos do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função para salvar ou atualizar produto
    const handleSave = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        if (!productId) {
            setResponseMessage('Por favor, insira o ID do produto para atualizar.');
            return;
        }

        try {
            // Enviar PUT para a rota de atualização
            const response = await axios.put(`http://localhost:8080/products/atualizarproduto/${productId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluindo token de autenticação, caso seja necessário
                }
            });

            if (response.status === 200) {
                setResponseMessage('Produto atualizado com sucesso!');
            } else {
                setResponseMessage('Erro ao atualizar o produto.');
            }
        } catch (error) {
            setResponseMessage('Erro ao conectar ao servidor.');
        }
    };

    // Limpar formulário
    const handleClear = () => {
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            estoque: '',
        });
        setResponseMessage('');
        setProductId('');
    };

    // Buscar produto ao digitar o ID
    const handleSearch = async () => {
        if (!productId) {
            setResponseMessage('Por favor, insira um ID de produto para buscar.');
            return;
        }

        try {
            // Rota GET para buscar o produto pelo ID
            const response = await axios.get(`http://localhost:8080/products/getProductById/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Token de autenticação, se necessário
                }
            });

            if (response.status === 200 && response.data) {
                setFormData({
                    nome: response.data.nome,
                    descricao: response.data.descricao,
                    preco: response.data.preco,
                    estoque: response.data.estoque,
                });
                setResponseMessage('Produto encontrado e carregado!');
            } else {
                setResponseMessage('Produto não encontrado.');
            }
        } catch (error) {
            setResponseMessage('Erro ao buscar produto.');
        }
    };

    return (
        <div className="user-account-form">
            <h3>Atualizar Produto</h3>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label>ID do Produto:</label>
                    <input
                        type="text"
                        name="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="form-control"
                    />
                    <button
                        type="button"
                        className="btn btn-info mt-2"
                        onClick={handleSearch}
                    >
                        Buscar Produto
                    </button> <br/>

                    <label>Nome do Produto:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    <label>Descrição:</label>
                    <input
                        type="text"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    <label>Preço:</label>
                    <input
                        type="text"
                        name="preco"
                        value={formData.preco}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    <label>Estoque:</label>
                    <input
                        type="number"
                        name="estoque"
                        value={formData.estoque}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary mt-3">Salvar</button>
                    <button type="button" className="btn btn-secondary mt-3" onClick={handleClear}>Limpar</button>
                </div>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default UpdateProductDataForm;
