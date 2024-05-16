const { StatusCodes } = require('http-status-codes');

const { AppError, InternalServerError } = require('../errors');
const { OrderRepository, OrderItemRepository, AddressRepository, CartRepository } = require('../repositories');

const processPayments = require('../utils/helpers/stripe.payment');
const { enums } = require('../utils/common');
const { PENDING, FAILED, PAID } = enums.PAYMENT_STATUS

const orderItemRepository = new OrderItemRepository();
const addressRepository = new AddressRepository();
const cartRepository = new CartRepository();

class OrderService {

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(data) {

        try {
            const items = data.items;
            const address = data.address;

            //check if an address already present or not
            const findAddress = await addressRepository.findAddress({
                where: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    email: address.email,
                    phone: address.phone,
                    street: address.street,
                    state: address.state,
                    country: address.country,
                    zipcode: address.zipcode,
                }
            });

            //add address details
            let addressId;
            if (!findAddress) {
                const address = await addressRepository.create(address);
                addressId = address.id;
            } else {
                addressId = findAddress.id;
            }

            const newOrder = await this.orderRepository.create({
                user_id: data.userId,
                amount: req.body.amount,
                address: addressId,
            });

            //add order items details in orderItem
            let orderItemsData = items.map((item) => {
                return {
                    order_id: newOrder.id,
                    shoe_id: item.id,
                    quantity: item.quantity
                };
            });
            //bulk insertion
            await orderItemRepository.bulkInsertData(orderItemsData);

            //making cart empty
            await cartRepository.bulkDeleteCartItems(newOrder.user_id);

            //process payments 
            const session = await processPayments(items, address, newOrder);
            return session.url;

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

    async getAllOrders() {

        try {
            const orders = await this.orderRepository.getAll();

            const response = await Promise.all(orders.map(async (data) => {
                const order = data.dataValues;

                const items = order.items;

                const itemsData = [];

                for (let item in items) {
                    const product = await Jewellery.findByPk(item);
                    let recievedProduct = product?.dataValues;
                    if (recievedProduct) {
                        recievedProduct.quantity = items[item];
                        itemsData.push(recievedProduct);
                    }
                }
                order.items = itemsData;

                const address = await Address.findByPk(order.address);
                order.address = address.dataValues;
                return order; // Return the modified order
            }));

            return response;
        } catch (error) {

            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Cannot removed the shoe from cart");
        }
    }

    async getUserOrders(userId) {

        try {

            const orders = await this.orderRepository.getUserOrders(userId);

            const response = await Promise.all(orders.map(async (data) => {
                const order = data.dataValues;

                const items = order.items;

                const itemsData = [];

                for (let item in items) {
                    const product = await Jewellery.findByPk(item);
                    let recievedProduct = product?.dataValues;
                    if (recievedProduct) {
                        recievedProduct.quantity = items[item];
                        itemsData.push(recievedProduct);
                    }
                }
                order.items = itemsData;
                return order; // Return the modified order
            }));

            return response;
        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot fetched the shoe", ["Shoe requested is not present"]);
            }

            throw new InternalServerError("Cannot get the cart items");
        }
    }

    async updateOrderStatus(orderId, status) {

        try {

            const response = await this.orderRepository.update(orderId, {
                orderStatus: status
            });

            return response;

        } catch (error) {

            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Cannot removed the shoe from cart");
        }
    }

    async verfiyOrder(orderId, success) {

        try {
            if (success === "true") {
                const response = await this.orderRepository.update(orderId, {
                    payment: PAID
                });
                return response;
            }
            else {
                const response = await this.orderRepository.update(orderId, {
                    payment: FAILED
                });
                return response;
            }
        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot fetched the shoe", ["Shoe requested is not present"]);
            }

            throw new InternalServerError("Cannot get the cart items");
        }
    }
}



module.exports = OrderService;