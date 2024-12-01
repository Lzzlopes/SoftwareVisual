import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    // Carrega todos os produtos ao montar o componente
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products/allProducts');
            if (response.status === 200) {
                setProducts(response.data); // Atualiza o estado com os produtos
            } else {
                console.error('Erro ao buscar produtos.');
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
        } finally {
            setLoading(false); // Define carregamento como concluído
        }
    };

    return (
        <div className="products">
            <h3 className="mt-5">Lista de Produtos</h3>
            {loading ? (
                <p>Carregando...</p>
            ) : products.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.nome}</td>
                            <td>{product.descricao}</td>
                            <td>{product.preco}</td>
                            <td>{product.estoque}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhum produto encontrado.</p>
            )}
        </div>
    );
};

export default Products;
