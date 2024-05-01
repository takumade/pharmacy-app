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
        res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
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
        const order = await Order.findById(orderId).populate('pharmacy');
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check if the user making the request is authorized to access the order
        // For example, you might check if the user is an admin or if the order belongs to the user
        // Additionally, you may check if the pharmacy associated with the order matches the requesting user's pharmacy
        if (!req.user.isAdmin && String(order.userId) !== String(req.user._id) && String(order.pharmacy) !== String(req.user.pharmacy)) {
            return res.status(403).json({ success: false, message: "You are not authorized to access this order" });
        }

        // Send the order in the response
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



module.exports = {
    
}