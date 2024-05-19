const { applicationStatus, userRoles } = require("../constants");
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

        // Get  users
        const users = await User.countDocuments();

        // Get  pharmacies
        const pharmacies = await Pharmacy.countDocuments();

        const applications = await Pharmacy.countDocuments({ isApproved: false, applicationStatus: applicationStatus.pending });

        // Get  approved pharmacies
        const approvedPharmacies = await Pharmacy.countDocuments({ isApproved: true });

        // Get  banned pharmacies
        const bannedPharmacies = await Pharmacy.countDocuments({ isBanned: true });

        // Get  medicines
        const medicines = await Medicine.countDocuments();

        // Get  orders
        const orders = await Order.countDocuments();

        // Get  transactions
        const transactions = await Transaction.countDocuments();

        // Get  prescriptions for the pharmacy
        const prescriptions = await Prescription.countDocuments();


        const customers = await Order.find().distinct('userId').countDocuments();



        // Send the statistics in the response
        res.status(200).json({
            success: true,
            data: {
                users,
                pharmacies,
                applications,
                approvedPharmacies,
                bannedPharmacies,
                medicines,
                customers,
                orders,
                transactions,
                prescriptions
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

        const pharmacy = await Pharmacy.findOne({owner: req.user._id})
        const pharmacyId = pharmacy._id

  

        // Get  orders for the pharmacy
        const orders = await Order.find({ pharmacy: pharmacyId }).countDocuments();

        // Get  transactions for the pharmacy
        const transactions = await Transaction.find({ pharmacyId: pharmacyId }).countDocuments();

        // Get  medicines for the pharmacy
        const medicines = await Medicine.find({ owner: pharmacyId }).countDocuments();

        // Get  prescriptions for the pharmacy
        const prescriptions = await Prescription.find({ pharmacyId:pharmacyId }).countDocuments();


        const customers = await Order.find({pharmacyId: pharmacyId}).distinct('userId').countDocuments()

        // Send the statistics in the response
        res.status(200).json({
            success: true,
            data: {
                orders,
                transactions,
                medicines,
                prescriptions,
                customers

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