// ./controllers/cartController.js

//const { Carts, CartItems } = require('../models');

class CartController {

    constructor(cartService) {
        this.cartService = cartService;
    }

    async addProduct(req, res) {
        try {
            const { userId } = req.params;
            const { productId, quantity } = req.body;

            console.log('userId:', userId);
            console.log('productId:', productId);
            console.log('quantity:', quantity);

            if (!userId || !productId || !quantity) {
                return res.status(400).json({ error: 'Dados inválidos' });
            }

            const cart = await this.cartService.addProductToCart(userId, productId, quantity);
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async removeProduct(req, res) {
        try {
            const { userId } = req.params;
            const { cartItemId } = req.body;
            await this.cartService.removeProductFromCart( userId, cartItemId );
            return res.status(200).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async viewCart(req, res) {
        const { userId } = req.params;
        try {
            const cart = await this.cartService.getCart(userId);
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }



}

module.exports = CartController;