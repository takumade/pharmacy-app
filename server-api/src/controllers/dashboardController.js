const Medicine = require("../models/medicineModel");
const Order = require("../models/orderModel");
const Pharmacy = require("../models/pharmacyModel");
const Prescription = require("../models/prescriptionModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");




const getAdminStats = async (req, res) => {
    try {
        // Check if the user making the request is an admin
        if (req.user.role !== userRoles.admin) {
            return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
        }

        // Get total users
        const totalUsers = await User.countDocuments();

        // Get total pharmacies
        const totalPharmacies = await Pharmacy.countDocuments();

        // Get total approved pharmacies
        const totalApprovedPharmacies = await Pharmacy.countDocuments({ approved: true });

        // Get total banned pharmacies
        const totalBannedPharmacies = await Pharmacy.countDocuments({ isBanned: true });

        // Get total medicines
        const totalMedicines = await Medicine.countDocuments();

        // Get total orders
        const totalOrders = await Order.countDocuments();

        // Get total transactions
        const totalTransactions = await Transaction.countDocuments();

        // Get total prescriptions for the pharmacy
        const totalPrescriptions = await Prescription.countDocuments();

        // Send the statistics in the response
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalPharmacies,
                totalApprovedPharmacies,
                totalBannedPharmacies,
                totalMedicines,
                totalOrders,
                totalTransactions,
                totalPrescriptions
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getPharmacyStats = async (req, res) => {
    try {
        // Retrieve pharmacy ID from the user's request
        const pharmacyId = req.user.pharmacy;

        // Get total orders for the pharmacy
        const totalOrders = await Order.countDocuments({ pharmacy: pharmacyId });

        // Get total transactions for the pharmacy
        const totalTransactions = await Transaction.countDocuments({ pharmacyId });

        // Get total medicines for the pharmacy
        const totalMedicines = await Medicine.countDocuments({ pharmacyId });

        // Get total prescriptions for the pharmacy
        const totalPrescriptions = await Prescription.countDocuments({ pharmacyId });

        // Send the statistics in the response
        res.status(200).json({
            success: true,
            data: {
                totalOrders,
                totalTransactions,
                totalMedicines,
                totalPrescriptions
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    getAdminStats,
    getPharmacyStats
}