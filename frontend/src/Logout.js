import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remover o token do localStorage

        onLogout(); // Atualizar o estado de autenticação no App

        // Redirecionar para a página de login
        navigate('/login');
    };

    return (
        <div className="logout-container">
            <h3>Você realmente deseja sair?</h3>
            <button className="btn btn-danger" onClick={handleLogout}>Confirmar Logout</button>
        </div>
    );
};

export default Logout;
