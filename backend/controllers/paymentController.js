// ./controllers/paymentController.js

const {Cart , CartItem}  = require("../models");

class PaymentController {

    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    async payWithCreditCard(req, res) {
        try {
            const userId = req.body.userId;
            const cart = await Cart.findOne({
                where: { userId },
                include: [{ model: CartItem, as: 'items' }],
            });

            if (!cart) {
                return res.status(404).json({ message: 'Carrinho não encontrado' });
            }

            const valorTotal = cart.valorTotal;

            const payment = await this.paymentService.createPayment({
                userId: req.body.userId,
                valorTotal,
                metodoPagamento: 'cartão de crédito',
                status: 'pendente',
            });

            res.json(payment);
        } catch (error) {
            console.error('Erro ao realizar pagamento:', error.stack);
            res.status(500).json({ message: 'Erro ao realizar pagamento' });
        }
    }

    async payWithPix(req, res) {
        try {
            const cart = await Cart.findOne({
                where: { userId: req.body.userId },
                include: [{ model: CartItem, as: 'items' }],
            });

            if (!cart) {
                return res.status(404).json({ message: 'Carrinho não encontrado' });
            }

            const valorTotal = cart.valorTotal;

            const payment = await this.paymentService.createPayment({
                userId: req.body.userId,
                valorTotal,
                metodoPagamento: 'PIX',
                status: 'pendente',
            });

            res.json(payment);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao realizar pagamento' });
        }
    }


    async getPaymentStatus(req, res) {
        try {
            const paymentId = req.params.paymentId;
            console.log(`Buscando pagamento com ID ${paymentId}`);
            const status = await this.paymentService.getPaymentStatus(paymentId);
            console.log(`Resultado da busca: ${JSON.stringify(status)}`);
            if (status.message) {
                res.status(404).json(status);
            } else {
                res.json({ status });
            }
        } catch (error) {
            console.error(`Erro ao buscar pagamento: ${error.stack}`);
            res.status(500).json({ message: 'Erro ao buscar pagamento', error: error.stack });
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const paymentId = req.params.paymentId;
            const status = req.body.status;
            const payment = await this.paymentService.updatePaymentStatus(paymentId, status);
            res.json(payment);
        } catch (error) {
            res.status(404).json({ message: 'Pagamento não encontrado' });
        }
    }

}

module.exports = PaymentController;