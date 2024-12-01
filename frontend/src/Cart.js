import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    // Função para salvar o carrinho no localStorage
    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Função para carregar o carrinho do localStorage
    const loadCartFromLocalStorage = () => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : null;
    };

    useEffect(() => {
        async function fetchCart() {
            try {
                // Tentar carregar o carrinho do localStorage primeiro
                const savedCart = loadCartFromLocalStorage();
                if (savedCart) {
                    setCart(savedCart);
                    console.log("Carrinho carregado do localStorage:", savedCart);
                    return;
                }

                // Se não houver carrinho salvo, buscar da API
                const response = await axios.get(`http://localhost:8080/cart/getall/${userId}`);
                console.log("Dados do carrinho da API:", response.data);
                setCart(response.data);

                // Salvar no localStorage
                saveCartToLocalStorage(response.data);
            } catch (err) {
                setError("Erro ao carregar o carrinho.");
                console.error(err);
            }
        }

        async function fetchProducts() {
            try {
                const response = await axios.get("http://localhost:8080/products/allProducts");
                setProducts(response.data);
            } catch (err) {
                setError("Erro ao carregar os produtos.");
                console.error(err);
            }
        }

        fetchCart();
        fetchProducts();
    }, [userId]);

    async function addToCartAndUpdate(productId, quantity) {
        try {
            console.log("Enviando dados para a API:", { userId, productId, quantity });

            const response = await axios.post(`http://localhost:8080/cart/add/${userId}`, {
                productId,
                quantity,
            });
            console.log("Produto adicionado com sucesso!", response.data);

            // Atualizar o carrinho após a adição
            const updatedCart = await axios.get(`http://localhost:8080/cart/getall/${userId}`);
            setCart(updatedCart.data);

            // Salvar no localStorage
            saveCartToLocalStorage(updatedCart.data);
        } catch (err) {
            console.error("Erro ao adicionar produto ao carrinho:", err.response?.data || err.message);
            setError("Erro ao adicionar produto ao carrinho.");
        }
    }

    async function removeFromCart(cartItemId) {
        try {
            console.log("Removendo produto do carrinho...", cartItemId);

            const response = await axios.delete(`http://localhost:8080/cart/remove/${userId}`, {
                data: { cartItemId }, // Envia o cartItemId no campo 'data'
            });
            console.log("Produto removido com sucesso!", response.data);

            // Atualizar o carrinho após a remoção
            const updatedCart = await axios.get(`http://localhost:8080/cart/getall/${userId}`);
            setCart(updatedCart.data);

            // Salvar no localStorage
            saveCartToLocalStorage(updatedCart.data);
        } catch (err) {
            console.error("Erro ao remover produto do carrinho:", err.response?.data || err.message);
            setError("Erro ao remover produto do carrinho.");
        }
    }

    return (
        <div>
            <h1>Meu Carrinho</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {cart ? (
                cart.items.length > 0 ? (
                    <ul>
                        {cart.items.map((item) => (
                            <li key={item.cartItemId}>
                                {item.product.nome} - Quantidade: {item.quantidade} - Preço Total: R$ {item.precoTotal.toFixed(2)}&emsp;
                                <button onClick={() => removeFromCart(item.cartItemId)}>Remover</button>
                                <br />
                            </li>
                        ))}
                        <li>
                            <br />
                            <h4>Total da compra: R$ {cart.valorTotal.toFixed(2)}</h4>
                            <button onClick={() => navigate("/payment")}>Continuar</button>
                        </li>
                    </ul>
                ) : (
                    <p>O carrinho está vazio.</p>
                )
            ) : (
                <p>Carregando...</p>
            )}

            {products.length > 0 ? (
                products.map((product) => (
                    <li key={product.productId}>
                        <h3>{product.nome}</h3>
                        <p>Preço: R$ {product.preco.toFixed(2)}</p>
                        <button onClick={() => addToCartAndUpdate(product.productId, 1)}>
                            Adicionar ao Carrinho
                        </button>
                    </li>
                ))
            ) : (
                <p>Nenhum produto disponível.</p>
            )}
        </div>
    );
}

export default Cart;
