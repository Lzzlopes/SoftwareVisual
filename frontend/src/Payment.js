import React, { useState } from "react";
import axios from "axios";

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState("PIX");
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem("userId"); // Recupera o ID do usuário

    const handlePayment = async () => {
        try {
            setError(null);
            setStatus(null);

            const endpoint =
                paymentMethod === "PIX"
                    ? "http://localhost:8080/payment/pix"
                    : "http://localhost:8080/payment/credit-card";

            const response = await axios.post(endpoint, { userId });

            setStatus(response.data); // Exibe detalhes do pagamento
        } catch (err) {
            setError("Erro ao processar pagamento.");
            console.error(err);
        }
    };

    const checkPaymentStatus = async (paymentId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/payment/status/${paymentId}`
            );
            alert(`Status do pagamento: ${response.data.status}`);
        } catch (err) {
            alert("Erro ao verificar o status do pagamento.");
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Pagamento</h1>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="PIX"
                        checked={paymentMethod === "PIX"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PIX
                </label>
                <label style={{ marginLeft: "10px" }}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cartão de crédito"
                        checked={paymentMethod === "cartão de crédito"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cartão de Crédito
                </label>
            </div>

            <button
                onClick={handlePayment}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Processar Pagamento
            </button>

            {status && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Pagamento realizado!</h2>
                    <p>
                        Método: {status.metodoPagamento} <br />
                        Valor: R$ {status.valorTotal} <br />
                        Status: {status.status}
                    </p>
                    <button
                        onClick={() => checkPaymentStatus(status.paymentId)}
                        style={{
                            padding: "5px 10px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Verificar Status
                    </button>
                </div>
            )}

            {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
        </div>
    );
}

export default Payment;
