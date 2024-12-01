// ./services/cartService.js

const {CartItem, Product} = require('../models');

class CartService {
    constructor(CartModel) {
        this.Cart = CartModel;
    }

    async addProductToCart(userId, productId, quantity) {
        let cart = await this.Cart.findOne({where: {userId}});

        if (!cart) {
            cart = await this.Cart.create({userId});
        }

        const product = await Product.findByPk(productId);
        console.log(`Product Price: ${product.preco}`);
        if (!product) {
            throw new Error("Product not found");
        }

        let precoTotal = product.preco * quantity;
        console.log(`Quantity: ${quantity}, Preco Total: ${precoTotal}`);

        const [cartItem, created] = await CartItem.findOrCreate({
            where: {cartId: cart.cartId, productId},
            defaults: {quantidade: quantity, precoTotal},
        });

        if (!created) {
            cartItem.quantidade += quantity;
            cartItem.precoTotal = cartItem.quantidade * product.preco;
            await cartItem.save();
        }

        return cartItem;
    }

    async removeProductFromCart(userId, cartItemId) {
        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        if (cartItem.quantidade > 1) {
            cartItem.quantidade -= 1;

            const product = await Product.findByPk(cartItem.productId);

            if (!product) {
                throw new Error("Product not found"); // Verifique se o produto existe
            }

            // Atualiza o precoTotal com base na nova quantidade
            cartItem.precoTotal = cartItem.quantidade * product.preco; // Usa o preço do produto
            await cartItem.save(); // Salva as alterações no banco de dados
        } else {
            // Se a quantidade for 1, remove o item do carrinho
            await cartItem.destroy();
        }


    }

    async getCart(userId) {
        // Busca o carrinho do usuário com os itens e produtos
        const cart = await this.Cart.findOne({
            where: {userId},
            include: [
                {
                    model: CartItem,
                    as: 'items', // Usa o alias correto
                    include: [
                        {
                            model: Product,
                            as: 'product' // Aqui se o Product tiver um alias, use também
                        }
                    ]
                }
            ],
        });

        return cart;
    }
}

module.exports = CartService;
