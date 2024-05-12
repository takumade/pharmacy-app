const { userRoles, applicationStatus } = require("../constants");
const Medicine = require("../models/medicineModel");
const Order = require("../models/orderModel");
const Pharmacy = require("../models/pharmacyModel");
const User = require("../models/userModel");


const searchPharmacies = async (req, res) => {
  const name = req.query.name
  const owner = req.query.owner

  try {

    let pharmacies = []

    if (name){
      pharmacies = await Pharmacy.find({name: {$regex : name, $options : "i"}})
    }
      
      
    if (owner){
      pharmacies = await Pharmacy.find({owner: owner})
    }
       

    res.status(200).json({ success: true, data:pharmacies });
   

  }catch(error){
    console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }

}


const getPharmacy = async (req, res) => {
    const pharmacyId = req.params.pharmacyId;
  
    try {
      // Find the pharmacy by ID
      const pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) {
        return res.status(404).json({ success: false, message: "Pharmacy not found" });
      }
  
      res.status(200).json({ success: true, pharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  const getPharmacies = async (req, res) => {
    try {
      // Find all pharmacies
      const pharmacies = await Pharmacy.find();
      res.status(200).json({ success: true, data: pharmacies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  const getApplications = async (req, res) => {
    
    try {
      // Find all pharmacies applications

      if (req.user.role  !== userRoles.admin && req.user.role !== userRoles.pharmacy){
        return res.status(403).json({ success: false, message: "You are not authorized to view  this information" });
      }

      if (req.user.role === userRoles.admin){
        const pharmacies = await Pharmacy.find({isApproved: false});
        res.status(200).json({ success: true, data: pharmacies });
      }

      if (req.user.role === userRoles.pharmacy){
        const pharmacies = await Pharmacy.find({isApproved: false, owner: req.user._id});
        res.status(200).json({ success: true, data: pharmacies });
      }

     
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

const createPharmacy = async (req, res) => {
    const currentUser = req.user;
  
    try {
      // Check if the user making the request is an admin or pharmacy
      if (currentUser.role !== userRoles.admin && currentUser.role !== userRoles.pharmacy) {
        return res.status(403).json({ success: false, message: "You are not authorized to create a pharmacy" });
      }
  
      // Create a new pharmacy object
      const newPharmacy = new Pharmacy(req.body);
  
      // Save the new pharmacy to the database
      await newPharmacy.save();
  
      res.status(201).json({ success: true, message: "Pharmacy created successfully", data: newPharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  const editPharmacy = async (req, res) => {
    const currentUser = req.user;
    const pharmacyId = req.params.pharmacyId;
    const newData = req.body;
  
    try {
      // Find the pharmacy by ID
      const pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) {
        return res.status(404).json({ success: false, message: "Pharmacy not found" });
      }
  
      // Check if the user making the request is an admin or the pharmacy itself
      if (currentUser.role !== userRoles.admin && String(pharmacy.owner) !== String(currentUser._id)) {
        return res.status(403).json({ success: false, message: "You are not authorized to edit this pharmacy" });
      }
  
      // Update pharmacy data
      Object.assign(pharmacy, newData);
  
      // If the pharmacy is editing itself, set approved to false
      if (String(pharmacy.owner) === String(currentUser._id)) {
        pharmacy.isApproved = false;
      }
  
      // Save the updated pharmacy
      await pharmacy.save();
  
      res.status(200).json({ success: true, message: "Pharmacy updated successfully", data: pharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  

  const deletePharmacy = async (req, res) => {
    const currentUser = req.user;
    const pharmacyId = req.params.pharmacyId;
  
    try {
      // Find the pharmacy by ID
      const pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) {
        return res.status(404).json({ success: false, message: "Pharmacy not found" });
      }
  
      // Check if the user making the request is an admin or the pharmacy itself
      if (currentUser.role !== userRoles.admin && String(pharmacy.owner) !== String(currentUser._id)) {
        return res.status(403).json({ success: false, message: "You are not authorized to delete this pharmacy" });
      }

      await Medicine.deleteMany({owner: pharmacy._id})
  
      // Soft delete the pharmacy by setting isDeleted to true
      pharmacy.isDeleted = true;
      await pharmacy.save();
  
      res.status(200).json({ success: true, message: "Pharmacy deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  

const approvePharmacy = async (req, res) => {
    const currentUser = req.user;
  
    try {
      // Check if the user making the request is an admin
      if (currentUser.role !== userRoles.admin) {
        return res.status(403).json({ success: false, message: "Only an admin can approve a pharmacy" });
      }
  
      // Find the pharmacy by ID
      const pharmacyId = req.params.pharmacyId;
      const pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) {
        return res.status(404).json({ success: false, message: "Pharmacy not found" });
      }
  
      // Update the isApproved field to true
      pharmacy.isApproved = true;
      pharmacy.applicationStatus = applicationStatus.approved;
      await pharmacy.save();
  
      res.status(200).json({ success: true, message: "Pharmacy approved successfully", data: pharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  const declinePharmacy = async (req, res) => {
    const currentUser = req.user;

    const { reason } = req.body
  
    try {
      // Check if the user making the request is an admin
      if (currentUser.role !== userRoles.admin) {
        return res.status(403).json({ success: false, message: "Only an admin can decline a pharmacy" });
      }
  
      // Find the pharmacy by ID
      const pharmacyId = req.params.pharmacyId;
      const pharmacy = await Pharmacy.findById(pharmacyId);
      if (!pharmacy) {
        return res.status(404).json({ success: false, message: "Pharmacy not found" });
      }
  
      // Update the isApproved field to true
      pharmacy.isApproved = false;
      pharmacy.applicationStatus = applicationStatus.decline;
      pharmacy.applicationReason = reason ? reason : ""
      await pharmacy.save();
  
      res.status(200).json({ success: true, message: "Pharmacy denied successfully", data: pharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  const getCustomers = async (req, res) => {
    try {
        // Retrieve the pharmacy ID from the request parameters
        const pharmacyId = req.params.pharmacyId;

        // Find the pharmacy
        const pharmacy = await Pharmacy.findById(pharmacyId);

        // Check if the pharmacy exists
        if (!pharmacy) {
            return res.status(404).json({ success: false, message: "Pharmacy not found" });
        }

        // Check if the authenticated user owns the pharmacy
        if (pharmacy.owner !== req.user._id) {
            return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
        }

        // Find orders associated with the pharmacy
        const orders = await Order.find({ pharmacy: pharmacyId });

        // Extract unique user IDs from the orders
        const userIds = [...new Set(orders.map(order => order.userId))];

        // Find users who have placed orders at the pharmacy
        const customers = await User.find({ _id: { $in: userIds } });

        // Send the list of customers in the response
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = {
  searchPharmacies,
    getPharmacies,
    getApplications,
    getPharmacy,
    createPharmacy,
    editPharmacy,
    deletePharmacy,
    getCustomers,
    approvePharmacy,
    declinePharmacy
}
