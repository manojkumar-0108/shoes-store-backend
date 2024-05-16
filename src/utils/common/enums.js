const USER_ROLES = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    SELLER: 'seller'
}

const PAYMENT_STATUS = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed'
}

const ORDER_STATUS = {
    CREATED: 'Order created',
    PROCESSING: 'Order processing',
    DISPATCHED: 'Order dispatched',
    OUT_FOR_DELIVERY: 'Out for delivery',
    DELIVERED: 'Order delivered',
    CANCELLED: 'Order cancelled'
}

module.exports = {
    USER_ROLES,
    PAYMENT_STATUS,
    ORDER_STATUS
}