const { userRoles } = require("../constants");
const Order = require("../models/orderModel");
const Pharmacy = require("../models/pharmacyModel");
const Prescription = require("../models/prescriptionModel");




const checkout = async (req, res) => {
    try {
        // Step 1: Retrieve Cart from Request Body
        const cart = req.body.cart;

        // Step 2: Calculate Total
        let totalAmount = 0;
        for (const item of cart.items) {
            totalAmount += item.quantity * item.product.price;
        }

        // Step 3: Create Order
        const newOrder = new Order({
            userId: req.user._id,
            items: cart.items.map(item => ({
                productId: item.product._id,
                productName: item.product.name,
                quantity: item.quantity,
                price: item.product.price
            })),
            totalAmount,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: 'cash-on-delivery'
        });


        await newOrder.save();

        // Step 7: Send Response
        res.status(201).json({ success: true, message: "Order placed successfully", data: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteOrder = async (req, res) => {
    try {
        // Extract order ID from the request parameters
        const orderId = req.params.orderId;

        // Find the order in the database
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check if the user making the request is authorized to delete the order
        // For example, you might check if the user is an admin or if the order belongs to the user
        if (!req.user.isAdmin && String(order.userId) !== String(req.user._id)) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this order" });
        }

        // Delete the order
        await Order.findByIdAndDelete(orderId);

        // Send success response
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getOrder = async (req, res) => {
    try {
        // Extract order ID from the request parameters
        const orderId = req.params.orderId;

        // Find the order in the database
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Fetch the pharmacy associated with the order
        const pharmacy = await Pharmacy.findById(order.pharmacy);
        if (!pharmacy) {
            return res.status(404).json({ success: false, message: "Pharmacy not found" });
        }

        // Check if the user making the request is authorized to access the order
        // For example, you might check if the user is an admin or if the order belongs to the user
        // Additionally, you may check if the pharmacy associated with the order matches the requesting user's pharmacy
        if (!req.user.isAdmin && String(order.userId) !== String(req.user._id) && String(pharmacy._id) !== String(order.pharmacy)) {
            return res.status(403).json({ success: false, message: "You are not authorized to access this order" });
        }

        // Send the order in the response
        res.status(200).json({ success: true, data:order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getOrders = async (req, res) => {
    try {
        // Define the criteria to filter orders
        const criteria = {};

        // Optionally, you can filter orders based on the requesting user's ID
        if (!req.user.role === userRoles.admin) {
            criteria.userId = req.user._id;
        }

        // Optionally, you can filter orders based on other parameters
        // For example, you might want to filter orders by pharmacy
        if (req.query.pharmacyId) {
            criteria.pharmacy = req.query.pharmacyId;
        }

        // Find orders in the database based on the criteria
        const orders = await Order.find(criteria);

        // Optionally, you can populate additional fields
        // For example, you might want to populate the pharmacy field
        // await Order.populate(orders, { path: 'pharmacy' });

        // Send the orders in the response
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = {
    checkout,
    deleteOrder,
    getOrder,
    getOrders
}