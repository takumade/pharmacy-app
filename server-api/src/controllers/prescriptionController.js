const { userRoles } = require("../constants");
const Pharmacy = require("../models/pharmacyModel");
const Prescription = require("../models/prescriptionModel");


const getPrescription = async (req, res) => {
    try {
        // Extract prescription ID from the request parameters
        const prescriptionId = req.params.prescriptionId;

        // Find the prescription in the database
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found" });
        }

        // Check if the user making the request is the owner of the prescription, a pharmacy, or an admin
        if (req.user.role !== userRoles.admin && String(prescription.owner) !== String(req.user._id) && req.user.role !== userRoles.pharmacy) {
            return res.status(403).json({ success: false, message: "You are not authorized to access this prescription" });
        }

        // Send the prescription in the response
        res.status(200).json({ success: true, prescription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getPrescriptions = async (req, res) => {
    try {
        let prescriptions;

        // Check if the user making the request is a pharmacy or an admin
        if (req.user.role === userRoles.admin) {
            // If the user is a pharmacy or an admin, retrieve all prescriptions
            prescriptions = await Prescription.find();
        } else if (req.user.role === userRoles.customer) {
            // If the user is a customer, retrieve only their own prescriptions
            prescriptions = await Prescription.find({ owner: req.user._id });
        }else if(req.user.role === userRoles.pharmacy){
            // TODO: get prescriotions submited to a pharmarcy 
        } else {
            // If the user role is not recognized, return a 403 Forbidden response
            return res.status(403).json({ success: false, message: "You are not authorized to access prescriptions" });
        }

        // Send the prescriptions in the response
        res.status(200).json({ success: true, prescriptions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const createPrescription = async (req, res) => {
    try {
        // Check if the user making the request is a customer
        if (req.user.role !== userRoles.customer) {
            return res.status(403).json({ success: false, message: "Only customers can create a prescription" });
        }

        // Create a new prescription instance
        const newPrescription = new Prescription({
            ...req.body,
            owner: req.user._id, // Assign the owner as the current user
        });

        // Save the new prescription to the database
        await newPrescription.save();

        // Send success response
        res.status(201).json({ success: true, message: "Prescription created successfully", prescription: newPrescription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const approvePrescription = async (req, res) => {
    try {
        // Check if the user making the request is a pharmacy
        if (req.user.role !== userRoles.pharmacy) {
            return res.status(403).json({ success: false, message: "Only pharmacies can approve a prescription" });
        }

        // Extract prescription ID from the request parameters
        const prescriptionId = req.params.prescriptionId;

        // Find the prescription in the database
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found" });
        }

        // Update the prescription's approved status to true
        prescription.approved = true;

        // Save the updated prescription to the database
        await prescription.save();

        // Send success response
        res.status(200).json({ success: true, message: "Prescription approved successfully", prescription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const deletePrescription = async (req, res) => {
    try {
        // Extract prescription ID from the request parameters
        const prescriptionId = req.params.prescriptionId;

        // Find the prescription in the database
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found" });
        }

        // Check if the user making the request is the owner of the prescription or an admin
        if ((req.user.role !== userRoles.admin || req.user.role !== userRoles.pharmacy) && String(prescription.owner) !== String(req.user._id)) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this prescription" });
        }

        // Delete the prescription from the database
        await Prescription.findByIdAndDelete(prescriptionId);

        // Send success response
        res.status(200).json({ success: true, message: "Prescription deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    getPrescription,
    getPrescriptions,
    createPrescription,
    approvePrescription,
    deletePrescription
}