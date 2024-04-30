

const createPharmacy = async (req, res) => {
    const currentUser = req.user;
  
    try {
      // Check if the user making the request is an admin or pharmacy
      if (currentUser.role !== 'admin' && currentUser.role !== 'pharmacy') {
        return res.status(403).json({ success: false, message: "You are not authorized to create a pharmacy" });
      }
  
      // Create a new pharmacy object
      const newPharmacy = new Pharmacy(req.body);
  
      // Save the new pharmacy to the database
      await newPharmacy.save();
  
      res.status(201).json({ success: true, message: "Pharmacy created successfully", pharmacy: newPharmacy });
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
      if (currentUser.role !== 'admin' && String(pharmacy.owner) !== String(currentUser._id)) {
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
  
      res.status(200).json({ success: true, message: "Pharmacy updated successfully", pharmacy });
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
      if (currentUser.role !== 'admin' && String(pharmacy.owner) !== String(currentUser._id)) {
        return res.status(403).json({ success: false, message: "You are not authorized to delete this pharmacy" });
      }
  
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
      if (currentUser.role !== 'admin') {
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
      await pharmacy.save();
  
      res.status(200).json({ success: true, message: "Pharmacy approved successfully", pharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }


module.exports = {
    createPharmacy,
    editPharmacy,
    deletePharmacy,
    approvePharmacy
}
