import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    // Handle form input change
    const handleChange = (e) => {
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
            const response = await axios.post('http://localhost:8080/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Armazenar o token e o userId recebidos
                const { Token, userId } = response.data;

                if (Token && userId) {
                    localStorage.setItem('token', Token); // Salvar o token no localStorage
                    localStorage.setItem('userId', userId);
                    onLogin(); // Atualiza o estado de autenticação no App
                    navigate('/products'); // Redireciona para a página de produtos
                } else {
                    setResponseMessage('Erro: Não foi possível autenticar o usuário.');
                }
            } else {
                setResponseMessage('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setResponseMessage('Erro ao fazer login. Verifique suas credenciais.');
        }
    };


    return (
        <div className="user-login">
            <h3>Entrar</h3>
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
                <button type="submit" className="btn btn-primary btn-block mt-3">
                    Entrar
                </button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};
export default UserLoginForm;
