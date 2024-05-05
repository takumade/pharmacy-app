let medicineData = [
    {
      "medicineName": "Amoxicillin",
      "brandName": "Amoxil",
      "genericName": "Amoxicillin",
      "dosageForm": "Capsule",
      "dosageStrength": "500 mg",
      "price": 15.99,
      "manufacturer": "Pfizer",
      "prescriptionRequired": false
    },
    {
      "medicineName": "Lisinopril",
      "brandName": "Prinivil",
      "genericName": "Lisinopril",
      "dosageForm": "Tablet",
      "dosageStrength": "10 mg",
      "price": 10.25,
      "manufacturer": "Merck",
      "prescriptionRequired": false
    },
    {
      "medicineName": "Atorvastatin",
      "brandName": "Lipitor",
      "genericName": "Atorvastatin",
      "dosageForm": "Tablet",
      "dosageStrength": "20 mg",
      "price": 12.75,
      "manufacturer": "Pfizer",
      "prescriptionRequired": false
    },
    {
      "medicineName": "Levothyroxine",
      "brandName": "Synthroid",
      "genericName": "Levothyroxine",
      "dosageForm": "Tablet",
      "dosageStrength": "100 mcg",
      "price": 8.99,
      "manufacturer": "AbbVie",
      "prescriptionRequired": false
    },
    {
      "medicineName": "Metformin",
      "brandName": "Glucophage",
      "genericName": "Metformin",
      "dosageForm": "Tablet",
      "dosageStrength": "850 mg",
      "price": 9.45,
      "manufacturer": "Novartis",
      "prescriptionRequired": false
    },
    {
      "medicineName": "Amlodipine",
      "brandName": "Norvasc",
      "genericName": "Amlodipine",
      "dosageForm": "Tablet",
      "dosageStrength": "5 mg",
      "price": 11.30,
      "manufacturer": "Pfizer",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Hydrochlorothiazide",
      "brandName": "Microzide",
      "genericName": "Hydrochlorothiazide",
      "dosageForm": "Capsule",
      "dosageStrength": "25 mg",
      "price": 14.20,
      "manufacturer": "Novartis",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Omeprazole",
      "brandName": "Prilosec",
      "genericName": "Omeprazole",
      "dosageForm": "Capsule",
      "dosageStrength": "20 mg",
      "price": 18.75,
      "manufacturer": "Merck",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Simvastatin",
      "brandName": "Zocor",
      "genericName": "Simvastatin",
      "dosageForm": "Tablet",
      "dosageStrength": "40 mg",
      "price": 13.50,
      "manufacturer": "AbbVie",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Losartan",
      "brandName": "Cozaar",
      "genericName": "Losartan",
      "dosageForm": "Tablet",
      "dosageStrength": "50 mg",
      "price": 10.95,
      "manufacturer": "Novartis",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Metoprolol",
      "brandName": "Lopressor",
      "genericName": "Metoprolol",
      "dosageForm": "Tablet",
      "dosageStrength": "25 mg",
      "price": 11.99,
      "manufacturer": "Merck",
      "prescriptionRequired": false
    },
    {
      "medicineName": "Ciprofloxacin",
      "brandName": "Cipro",
      "genericName": "Ciprofloxacin",
      "dosageForm": "Tablet",
      "dosageStrength": "500 mg",
      "price": 16.50,
      "manufacturer": "Bayer",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Sertraline",
      "brandName": "Zoloft",
      "genericName": "Sertraline",
      "dosageForm": "Tablet",
      "dosageStrength": "50 mg",
      "price": 14.75,
      "manufacturer": "Pfizer",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Warfarin",
      "brandName": "Coumadin",
      "genericName": "Warfarin",
      "dosageForm": "Tablet",
      "dosageStrength": "2 mg",
      "price": 9.80,
      "manufacturer": "Bristol Myers Squibb",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Metronidazole",
      "brandName": "Flagyl",
      "genericName": "Metronidazole",
      "dosageForm": "Tablet",
      "dosageStrength": "250 mg",
      "price": 12.30,
      "manufacturer": "Pfizer",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Tramadol",
      "brandName": "Ultram",
      "genericName": "Tramadol",
      "dosageForm": "Capsule",
      "dosageStrength": "50 mg",
      "price": 17.25,
      "manufacturer": "Janssen Pharmaceuticals",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Alprazolam",
      "brandName": "Xanax",
      "genericName": "Alprazolam",
      "dosageForm": "Tablet",
      "dosageStrength": "0.5 mg",
      "price": 20.50,
      "manufacturer": "Pfizer",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Diazepam",
      "brandName": "Valium",
      "genericName": "Diazepam",
      "dosageForm": "Tablet",
      "dosageStrength": "5 mg",
      "price": 18.99,
      "manufacturer": "Roche",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Prednisone",
      "brandName": "Deltasone",
      "genericName": "Prednisone",
      "dosageForm": "Tablet",
      "dosageStrength": "10 mg",
      "price": 11.90,
      "manufacturer": "Pfizer",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Furosemide",
      "brandName": "Lasix",
      "genericName": "Furosemide",
      "dosageForm": "Tablet",
      "dosageStrength": "40 mg",
      "price": 13.25,
      "manufacturer": "Sanofi",
      "prescriptionRequired": true
    },
    {
      "medicineName": "Levothyroxine",
      "brandName": "Synthroid",
      "genericName": "Levothyroxine",
      "dosageForm": "Tablet",
      "dosageStrength": "50 mcg",
      "price": 8.75,
      "manufacturer": "AbbVie",
      "prescriptionRequired": false
    },
    {
      "medicineName": "Montelukast",
      "brandName": "Singulair",
      "genericName": "Montelukast",
      "dosageForm": "Tablet",
      "dosageStrength": "10 mg",
      "price": 15.60,
      "manufacturer": "Merck",
      "prescriptionRequired": false
    }
  ]
  
  module.exports = medicineData