import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserAccountForm from './UserAccountForm';
import ProductDataForm from './ProductDataForm';
import UserLoginForm from './UserLoginForm';
import Logout from './Logout';
import Products from './Products';
import UpdateProductDataForm from './UpdateProductForm';
import DeleteProduct from './DeleteProduct';
import Cart from './Cart'
import Payment from './Payment';
import SupplierAccountForm from "./SupplierAccountForm";
import SupplierLoginForm from "./SupplierLoginForm";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUserType = localStorage.getItem('userType');
            if (token && storedUserType) {
            setIsAuthenticated(true);
            setUserType(storedUserType);
        }
    }, []);

    const handleLogin = (userType) => {
        setIsAuthenticated(true);
        setUserType(userType);
        localStorage.setItem('userType', userType);
        localStorage.setItem('authToken', 'true'); // Set a dummy token for simplicity
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserType(null);
        localStorage.clear();
    };

    return (
        <Router>
            <div className="App">
                {/* Navigation Bar */}
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
                                </>
                            ) : userType === 'supplier' ? (
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
                                        <Link className="nav-link" to="/logout">Sair</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/products">Produtos</Link>
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
                        <Route path="/" element={<h1 className="display-4">Bem-vindo</h1>}/>
                        <Route path="/create-account" element={<UserAccountForm onLogin={handleLogin}/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/login" element={<UserLoginForm onLogin={handleLogin}/>}/>
                        <Route path="/logout" element={<Logout onLogout={handleLogout}/>}/>
                        <Route path="/novoProduto" element={<ProductDataForm/>}/>
                        <Route path="/updateProduct" element={<UpdateProductDataForm/>}/>
                        <Route path="/deleteProduct" element={<DeleteProduct/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/payment" element={<Payment/>}/>
                        <Route path="/supplier-account" element={<SupplierAccountForm onLogin={handleLogin}/>}/>
                        <Route path="/supplier-login" element={<SupplierLoginForm onLogin={handleLogin}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}


export default App;
