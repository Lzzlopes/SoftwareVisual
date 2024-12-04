import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'

const UserAccountForm = ({onLogin}) => {
    const [formData, setFormData] = useState({
        email:'',
        cnpj:'',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    // Handle form input change
    const handleChange = (e) => {
        console.log('Entrou aqui')
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/suppliers/createSupplier', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setResponseMessage('Fornecedor criado com sucesso!');
                onLogin('supplier');
                navigate('/products')
            } else {
                setResponseMessage('Erro ao criar fornecedor: ' + response.statusText);
            }
        } catch (error) {
            if (error.response) {
                // Se a resposta for um erro
                setResponseMessage(`Erro: ${error.response.status} - ${error.response.data.message || 'Erro desconhecido'}`);
            } else if (error.request) {
                // Se não houve resposta, mas a requisição foi feita
                setResponseMessage('Falha na conexão com o servidor.');
            } else {
                setResponseMessage('Erro desconhecido: ' + error.message);
            }
        }
    };

    return (
        <div className="user-account-form">
            <h3>Crie sua conta de usuário</h3>
            <form onSubmit={handleSubmit} className="form-group">
                <div>
                    <label>Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>CNPJ:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Create Account</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
            <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate('/create-account')}
            >
                Criar conta de Usuário
            </button>
        </div>
    );
};

export default UserAccountForm;
