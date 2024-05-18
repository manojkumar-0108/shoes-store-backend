const { serverConfig } = require('../../config');
const Stripe = require("stripe");
const stripe = new Stripe(serverConfig.STRIPE_SECRET_KEY);


async function processPayments(items, address, orderId) {

    const line_items = items.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100
        },
        quantity: item.quantity
    }));

    line_items.push({
        price_data: {
            currency: "inr",
            product_data: {
                name: "Delivery Charge"
            },
            unit_amount: 5 * 100
        },
        quantity: 1
    });

    const customer = await stripe.customers.create({
        name: `${address.firstName} ${address.lastName}`,
        address: {
            line1: address.street,
            postal_code: address.zipcode,
            city: address.city,
            state: address.state,
            country: address.country,
        },
    });

    const session = await stripe.checkout.sessions.create({
        success_url: `${serverConfig.PAYMENT_SUCCESS_URL}${orderId}`,
        cancel_url: `${serverConfig.PAYMENT_FAILED_URL}${orderId}`,
        line_items: line_items,
        mode: 'payment',
        customer: customer.id
    });

    return session;

}

module.exports = processPayments;