const Pharmacy = require("../models/pharmacyModel")



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