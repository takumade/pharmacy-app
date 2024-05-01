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
            paymentMethod: req.body.paymentMethod
        });

        // Step 4: Process Payment
        const paymentResult = await PaymentService.processPayment(req.body.paymentMethod, totalAmount);

        if (!paymentResult.success) {
            return res.status(400).json({ success: false, message: "Payment failed", error: paymentResult.error });
        }

        // Step 5: Update Inventory (not shown here, assume it's done elsewhere)

        // Step 6: Save Order
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