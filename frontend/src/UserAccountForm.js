import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'

const UserAccountForm = ({onLogin}) => {
    const [formData, setFormData] = useState({
        email:'',
        data_nasc:'',
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
            // const response = await fetch('https://api.example.com/create-account', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            const response = await axios.post('http://localhost:8080/users/novouser',
                formData,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                });

            if(response.status === 200){
                const { userId } = response.data;
                localStorage.setItem('userId', userId);

                setResponseMessage('Conta criada!');
                onLogin();
                navigate('/products')
            }
            else{
                setResponseMessage('Erro ao criar a conta.');
            }

            // if (response.ok) {
            //     const result = await response.json();
            //     setResponseMessage('Account created successfully!');
            // } else {
            //     setResponseMessage('Error creating account.');
            // }
        } catch (error) {
            setResponseMessage('Failed to connect to server.');
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
                    <label>Data Nascimento:</label>
                    <input
                        className="form-control"
                        type="date"
                        name="data_nasc"
                        value={formData.data_nasc}
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
                onClick={() => navigate('/supplier-account')}
            >
                Criar conta de Fornecedor
            </button>
        </div>
    );
};

export default UserAccountForm;
