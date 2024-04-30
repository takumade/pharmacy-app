const Medicine = require("../models/medicineModel")


const getMedicine = async (req, res) => {
    const medicineId = req.params.medicineId;
  
    try {
      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ success: false, message: "Medicine not found" });
      }
  
      res.status(200).json({ success: true, medicine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  const getMedicines = async (req, res) => {
    try {
      const medicines = await Medicine.find();
      res.status(200).json({ success: true, medicines });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  const addMedicine = async (req, res) => {
    const newMedicineData = req.body;
  
    try {
      const newMedicine = new Medicine(newMedicineData);
      await newMedicine.save();
  
      res.status(201).json({ success: true, message: "Medicine added successfully", medicine: newMedicine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  const addMedicines = async (req, res) => {
    const newMedicinesData = req.body;
  
    try {
      const newMedicines = await Medicine.insertMany(newMedicinesData);
  
      res.status(201).json({ success: true, message: "Medicines added successfully", medicines: newMedicines });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  const editMedicine = async (req, res) => {
    const medicineId = req.params.medicineId;
    const newData = req.body;
  
    try {
      const medicine = await Medicine.findById(medicineId);

      if (!medicine) {
        return res.status(404).json({ success: false, message: "Medicine not found" });
      }
  
      // Check if the user making the request is a pharmacy or admin
      if (req.user.role !== 'admin' && req.user.role !== 'pharmacy') {
        return res.status(403).json({ success: false, message: "You are not authorized to edit this medicine" });
      }
      
      
      Object.assign(medicine, newData);
      await medicine.save();
  
      res.status(200).json({ success: true, message: "Medicine updated successfully", medicine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  const deleteMedicine = async (req, res) => {
    const medicineId = req.params.medicineId;
  
    try {
      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ success: false, message: "Medicine not found" });
      }
  
      // Check if the user making the request is a pharmacy or admin
      if (req.user.role !== 'admin' && req.user.role !== 'pharmacy') {
        return res.status(403).json({ success: false, message: "You are not authorized to delete this medicine" });
      }
  
      await Medicine.findByIdAndDelete(medicineId);
      res.status(200).json({ success: true, message: "Medicine deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  const deleteMedicines = async (req, res) => {
    const medicineIds = req.body.medicineIds;
  
    try {
      // Check if the user making the request is a pharmacy or admin
      if (req.user.role !== 'admin' && req.user.role !== 'pharmacy') {
        return res.status(403).json({ success: false, message: "You are not authorized to delete medicines" });
      }
  
      await Medicine.deleteMany({ _id: { $in: medicineIds } });
      res.status(200).json({ success: true, message: "Medicines deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  module.exports = {
    getMedicine,
    getMedicines,
    addMedicine,
    addMedicines,
    editMedicine,
    deleteMedicine,
    deleteMedicines
  };