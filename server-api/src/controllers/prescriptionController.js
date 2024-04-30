const Pharmacy = require("../models/pharmacyModel");
const Prescription = require("../models/prescriptionModel");



const createPrescription = async (req, res) => {
    try {
        // Check if the user making the request is a customer
        if (req.user.role !== 'customer') {
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
        if (req.user.role !== 'pharmacy') {
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
        if ((req.user.role !== 'admin' || req.user.role !== 'pharmacy') && String(prescription.owner) !== String(req.user._id)) {
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
