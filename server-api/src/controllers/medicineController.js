const { userRoles } = require("../constants");
const Medicine = require("../models/medicineModel");
const Pharmacy = require("../models/pharmacyModel");



const searchMedicine = async (req, res) => {
    const name = req.query.name

    try {

      let medicines = await Medicine.find({medicineName: {$regex : name, $options : "i"}})
                                    .populate('owner')

      res.status(200).json({ success: true, data:medicines });
     

    }catch(error){
      console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

const getMedicine = async (req, res) => {
    const medicineId = req.params.medicineId;

    try {
        let medicine;
        if (req.user.role === userRoles.pharmacy) {
            // If the user is a pharmacy, they can only retrieve their own medicine
            let pharmacy = await Pharmacy.findOne({ owner: req.user._id });
            medicine = await Medicine.findOne({ _id: medicineId, owner:  pharmacy._id});
        } else {
            medicine = await Medicine.findById(medicineId);
        }

        if (!medicine) {
            return res.status(404).json({ success: false, message: "Medicine not found" });
        }

        res.status(200).json({ success: true, data:medicine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getMedicines = async (req, res) => {
    try {
        let medicines;
        if (req.user.role === userRoles.pharmacy) {
            // If the user is a pharmacy, they can only retrieve their own medicines
            let pharmacy = await Pharmacy.findOne({ owner: req.user._id });
            medicines = await Medicine.find({ owner: pharmacy._id });
        } else {
          if (req.user.role === userRoles.admin) {
            medicines = await Medicine.find();
          }else{
            res.status(403).json({ success: false, message: "You are not authorized to fetch medicines" });
          }
        }

        res.status(200).json({ success: true, data:medicines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const addMedicine = async (req, res) => {
  const newMedicineData = req.body;

  try {
    // Retrieve the pharmacy ID based on the current user's ID
    const pharmacy = await Pharmacy.findOne({ owner: req.user._id });
    if (!pharmacy) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Pharmacy not found for current user",
        });
    }

    // Assign the owner field to the pharmacy's ID
    newMedicineData.owner = pharmacy._id;

    const newMedicine = new Medicine(newMedicineData);
    await newMedicine.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Medicine added successfully",
        medicine: newMedicine,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const addMedicines = async (req, res) => {
  const newMedicinesData = req.body;

  try {
    // Retrieve the pharmacy ID based on the current user's ID
    const pharmacy = await Pharmacy.findOne({ owner: req.user._id });
    if (!pharmacy) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Pharmacy not found for current user",
        });
    }

    // Update the owner field for each medicine in newMedicinesData
    const newMedicinesWithOwner = newMedicinesData.map((medicineData) => ({
      ...medicineData,
      owner: pharmacy._id,
    }));

    const newMedicines = await Medicine.insertMany(newMedicinesWithOwner);

    res
      .status(201)
      .json({
        success: true,
        message: "Medicines added successfully",
        medicines: newMedicines,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editMedicine = async (req, res) => {
  const medicineId = req.params.medicineId;
  const newData = req.body;

  try {
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });
    }

    // Check if the user making the request is the owner of the pharmacy associated with the medicine or an admin
    const pharmacy = await Pharmacy.findOne({ _id: medicine.owner });
    if (
      !pharmacy ||
      (req.user.role !== userRoles.admin &&
        String(pharmacy.owner) !== String(req.user._id))
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to edit this medicine",
        });
    }

    Object.assign(medicine, newData);
    await medicine.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Medicine updated successfully",
        data:medicine,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteMedicine = async (req, res) => {
  const medicineId = req.params.medicineId;

  try {
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });
    }

    // Check if the user making the request is the owner of the pharmacy associated with the medicine or an admin
    const pharmacy = await Pharmacy.findOne({ _id: medicine.owner });
    if (
      !pharmacy ||
      (req.user.role !== userRoles.admin &&
        String(pharmacy.owner) !== String(req.user._id))
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to delete this medicine",
        });
    }

    await Medicine.findByIdAndDelete(medicineId);
    res
      .status(200)
      .json({ success: true, message: "Medicine deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteMedicines = async (req, res) => {
  const medicineIds = req.body.medicineIds;

  try {
    // Check if the user making the request is an admin
    if (req.user.role !== userRoles.admin) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to delete medicines",
        });
    }

    await Medicine.deleteMany({ _id: { $in: medicineIds } });
    res
      .status(200)
      .json({ success: true, message: "Medicines deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  searchMedicine,
  getMedicine,
  getMedicines,
  addMedicine,
  addMedicines,
  editMedicine,
  deleteMedicine,
  deleteMedicines,
};
