// ./services/paymentService.js

const {Payment} = require('../models');

class PaymentService {

    async createPayment(data) {
        return Payment.create(data);
    }

    async updatePaymentStatus(paymentId, status) {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            throw new Error('Pagamento não encontrado');
        }
        payment.status = status;
        await payment.save();
        return payment;
    }

    async getPaymentStatus(paymentId) {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return {message: 'Pagamento não encontrado'};
        }
        return payment.status;
    }
}

module.exports = PaymentService;
