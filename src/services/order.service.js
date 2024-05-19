const { StatusCodes } = require('http-status-codes');

const { AppError, InternalServerError } = require('../errors');
const { OrderRepository, OrderItemRepository, AddressRepository, CartRepository, ShoeRepository } = require('../repositories');

const processPayments = require('../utils/helpers/stripe.payment');
const { enums } = require('../utils/common');
const { FAILED, PAID } = enums.PAYMENT_STATUS

const orderItemRepository = new OrderItemRepository();
const addressRepository = new AddressRepository();
const cartRepository = new CartRepository();
const shoeRepository = new ShoeRepository();

class OrderService {

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(data, userId) {

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
                const addressData = await addressRepository.create(address);
                addressId = addressData.id;
            } else {
                addressId = findAddress.id;
            }


            const newOrder = await this.orderRepository.create({
                user_id: userId,
                amount: data.amount,
                address_id: addressId,
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
            const session = await processPayments(items, address, newOrder.id);
            return session.url;

        } catch (error) {

            console.log(error);

            if (error.name == 'Error') {
                console.log("Called : ");
                throw new AppError(StatusCodes.BAD_REQUEST, "Cannot place order", ['Stripe API missing']);
            }

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Cannot place order", explanation);
            }

            throw new InternalServerError("Cannot place order");
        }
    }

    async getAllOrders() {

        try {
            const orders = await this.orderRepository.getAll();

            const response = await Promise.all(orders.map(async (data) => {
                const order = data.dataValues;
                const orderItems = await orderItemRepository.getItemsByOrderId(order.id);

                const address = await addressRepository.get(order.address_id);
                order.address = address;
                const itemsData = await Promise.all(orderItems.map(async (item) => {
                    const shoe = await shoeRepository.get(item.dataValues.shoe_id);
                    return {
                        name: shoe.dataValues.name,
                        quantity: item.dataValues.quantity
                    };
                }));

                order.items = itemsData;
                return order;
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
                const orderItems = await orderItemRepository.getItemsByOrderId(order.id);
                const itemsData = await Promise.all(orderItems.map(async (item) => {
                    const shoe = await shoeRepository.get(item.dataValues.shoe_id);
                    return {
                        name: shoe.dataValues.name,
                        quantity: item.dataValues.quantity
                    };
                }));

                order.items = itemsData;
                return order;
            }));
            return response;
        } catch (error) {
            console.log(error);

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot fetch orders", ["Shoe requested is not present"]);
            }

            throw new InternalServerError("Cannot get the orders");
        }
    }

    async updateOrderStatus(orderId, status) {

        try {

            const response = await this.orderRepository.update(orderId, {
                order_status: status
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


    async cancelOldBookings() {
        try {
            const time = new Date(Date.now() - 1000 * 300); // time 5 mins ago
            const response = await this.orderRepository.cancelOldBookings(time);
            return response;

        } catch (error) {
            console.log(error);
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went worng!', [error]);
        }
    }
}



module.exports = OrderService;