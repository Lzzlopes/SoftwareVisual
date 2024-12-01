import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import UserAccountForm from './UserAccountForm';
import ProductDataForm from './ProductDataForm';
import UserLoginForm from './UserLoginForm';
import Logout from './Logout';
import Products from './Products';
import UpdateProductDataForm from './UpdateProductForm';
import DeleteProduct from './DeleteProduct';
import Cart from './Cart'
import Payment from './Payment';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

    useEffect(() => {
        // Verificar se o token está presente no localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true); // Se o token existir, o usuário está autenticado
        }
    }, []); // Esse efeito só é executado uma vez, no início da aplicação

    const handleLogin = () => {
        setIsAuthenticated(true); // Define como autenticado após login
    };

    const handleLogout = () => {
        setIsAuthenticated(false); // Redefine como não autenticado após logout
    };

    return (
        <Router>
            <div className="App">
                {/* Bootstrap Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Landing Page</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            {!isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create-account">Criar conta</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/products">Produtos</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/products">Produtos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/novoProduto">Novo Produto</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/updateProduct">Atualizar Produto</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/deleteProduct">Deletar Produto</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">Carrinho</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Sair</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container text-center mt-5">
                    <Routes>
                        <Route path="/" element={<h1 className="display-4">Segundo Bimestre</h1>}/>
                        <Route path="/create-account" element={<UserAccountForm/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/login" element={<UserLoginForm onLogin={handleLogin} />}/>
                        <Route path="/logout" element={<Logout onLogout={handleLogout} />}/>
                        <Route path="/novoProduto" element={<ProductDataForm/> }/>
                        <Route path="/updateProduct" element={<UpdateProductDataForm />}/>
                        <Route path="/deleteProduct" element={<DeleteProduct />}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/payment" element={<Payment/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
