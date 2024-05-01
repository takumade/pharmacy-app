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



module.exports = {

}