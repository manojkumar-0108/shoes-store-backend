const { StatusCodes } = require('http-status-codes');

const { AppError, InternalServerError } = require('../errors');
const { CartRepository } = require('../repositories');


class ShoeService {

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async addToCart(userId, productId) {

        try {
            //if product already present in cart, update qty otherwise add new entry
            const findProduct = await this.cartRepository.findProduct(userId, productId);

            if (findProduct) {
                await this.cartRepository.update(findProduct.id, {
                    quantity: (findProduct.quantity + 1)
                })
            } else {
                await this.cartRepository.create({
                    user_id: userId,
                    product_id: productId
                });
            }
            return true;
        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot find the product in cart", ["Product and user is not present"]);
            }

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
            }

            throw new InternalServerError("Cannot add to cart");
        }
    }

    async removeFromCart(userId, productId) {

        try {
            // check if product available in cart or not 
            const findProduct = await this.cartRepository.findProduct(userId, productId);

            if (findProduct) {
                if (findProduct.quantity > 1) {
                    await this.cartRepository.update(findProduct.id, {
                        quantity: (findProduct.quantity - 1)
                    });
                } else {
                    await this.cartRepository.destroy(findProduct.id);
                }
            } else {
                throw new AppError(error.statusCode, "Cannot find the product in cart", ["Product is already removed"]);

            }
            return true;
        } catch (error) {

            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Cannot removed the shoe from cart");
        }
    }

    async getCart(userId) {

        try {
            const cartItems = await this.cartRepository.getAllCartItems(userId);

            console.log('Cart Items : ', cartItems);

            let cartData = {};

            if (cartItems.length > 0) {
                cartItems.map((item) => {
                    cartData[item.product_id] = item.quantity;
                });
            }

            console.log('Cart data : ', cartData)

            return cartData;

        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot fetched the shoe", ["Shoe requested is not present"]);
            }

            throw new InternalServerError("Cannot get the cart items");
        }
    }
}



module.exports = ShoeService;