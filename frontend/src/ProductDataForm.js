import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        nome:'',
        descricao:'',
        preco:'',
        estoque: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    //criar um objeto para busca de produtos pelo ID

    //Tratar o evento change dos campos do form
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //Tratar o salvar / grava dados
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/products/novoproduto',
                formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            if (response.status === 200) {
                setResponseMessage('Produto cadastrado com sucesso');
            } else {
                setResponseMessage('Erro ao cadastrar produto.');
            }
        } catch (error) {
            setResponseMessage('Failed to connect to server.');
        }
    };

    const handleClear = () =>{
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            estoque: '',
        });
        setResponseMessage('');
    };

    return (
        <div className = "user-account-form">
            <h3>Cadastro de Produtos</h3>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label>Produto:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.produto}
                        onChange={handleChange}
                        required>
                    </input>
                    <label>Categoria:</label>
                    <input
                        type="text"
                        name="descricao"
                        value={formData.categoria}
                        onChange={handleChange}
                        required>
                    </input>
                    <label>Preço:</label>
                    <input
                        type="text"
                        name="preco"
                        value={formData.preco}
                        onChange={handleChange}
                        required>
                    </input>
                    <label>Estoque:</label>
                    <input
                        type="number"
                        name="estoque"
                        value={formData.estoque}
                        onChange={handleChange}
                        required>
                    </input>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" onClick={handleSave}>Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClear}>Limpar</button>
                </div>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ProductDataForm;