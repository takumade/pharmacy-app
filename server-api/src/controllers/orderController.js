const { userRoles } = require("../constants");
const Order = require("../models/orderModel");
const Pharmacy = require("../models/pharmacyModel");
const Prescription = require("../models/prescriptionModel");




const checkout = async (req, res) => {
    try {
        // Step 1: Retrieve Cart from Request Body
        const { cart, shippingAddress, pharmacyId  }= req.body;

        // Step 2: Calculate Total
        let totalAmount = 0;
        for (const item of cart) {
            totalAmount += item.quantity * item.price;
        }

        // Step 3: Create Order
        const newOrder = new Order({
            userId: req.user._id,
            pharmacyId: pharmacyId,
            items: cart.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount,
            shippingAddress: shippingAddress,
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
        const pharmacy = await Pharmacy.findById(order.pharmacyId);
        if (!pharmacy) {
            return res.status(404).json({ success: false, message: "Pharmacy not found" });
        }

        // Check if the user making the request is authorized to access the order
        // For example, you might check if the user is an admin or if the order belongs to the user
        // Additionally, you may check if the pharmacy associated with the order matches the requesting user's pharmacy
        if (!req.user.isAdmin && String(order.userId) !== String(req.user._id) && String(pharmacy._id) !== String(order.pharmacyId)) {
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
        let orders = []

        // Optionally, you can filter orders based on the requesting user's ID
        if (req.user.role === userRoles.customer) {
            criteria.userId = req.user._id;
        }

        // Optionally, you can filter orders based on other parameters
        // For example, you might want to filter orders by pharmacy
        if (req.user.role === userRoles.pharmacy) {
            let pharmacy = await Pharmacy.findOne({owner: req.user._id})
                                         .populate("userId")
                                         .populate("pharmacyId")
            criteria.pharmacyId = pharmacy._id;
        }

        // Find orders in the database based on the criteria
        if (req.user.role === userRoles.admin)
            orders = await Order.find().populate("userId")
                                       .populate("pharmacyId")
                                   
        else

        
            orders = await Order.find(criteria).populate("userId")
                                               .populate("pharmacyId")

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


const approveOrder = async (req, res) => {
    const currentUser = req.user;
  
    try {
      // Check if the user making the request is an admin
      if (currentUser.role !== userRoles.pharmacy && currentUser.role !== userRoles.admin ) {
        return res.status(403).json({ success: false, message: "Only a pharmacy can approve a order" });
      }
  
      // Find the pharmacy by ID
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      // Update the isApproved field to true
      order.approveStatus = "approved";
      await order.save();
  
      res.status(200).json({ success: true, message: "Order approved successfully", data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  const declineOrder = async (req, res) => {
    const currentUser = req.user;

    const { reason } = req.body
  
    try {
      // Check if the user making the request is an admin
      if (currentUser.role !== userRoles.admin && currentUser.role !== userRoles.pharmacy ) {
        return res.status(403).json({ success: false, message: "Only a pharmacy can decline an order" });
      }
  
      // Find the pharmacy by ID
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      // Update the isApproved field to true
      order.approveStatus = "pending" 
      order.deniedReason = reason ? reason : ""
      await order.save();
  
      res.status(200).json({ success: true, message: "Order denied successfully", data: pharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }



module.exports = {
    checkout,
    deleteOrder,
    getOrder,
    getOrders,
    approveOrder,
    declineOrder
}