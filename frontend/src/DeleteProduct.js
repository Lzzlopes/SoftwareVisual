import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'


const DeleteProduct = () => {
    const [productId, setProductId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const navigate = useNavigate();


    // Função para deletar produto
    const handleDelete = async () => {
        if (!productId) {
            setResponseMessage('Por favor, insira o ID do produto para deletar.');
            return;
        }

        try {
            // Requisição DELETE para o backend
            const response = await axios.delete(`http://localhost:8080/products/deletar/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.status === 200) {
                setResponseMessage('Produto deletado com sucesso!');
                navigate('/products')

            } else {
                setResponseMessage('Erro ao deletar o produto.');
            }
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            setResponseMessage('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="delete-product">
            <h3>Deletar Produto</h3>
            <div className="form-group">
                <label>ID do Produto:</label>
                <input
                    type="text"
                    className="form-control"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Digite o ID do produto"
                />
            </div>
            <button
                className="btn btn-danger mt-3"
                onClick={handleDelete}
            >
                Deletar Produto
            </button>
            {responseMessage && <p className="mt-3">{responseMessage}</p>}
        </div>
    );
};

export default DeleteProduct;
