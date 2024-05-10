export interface Pharmacy {
  _id: string;
  owner: string;
  name: string;
  logo: string;
  location: string;
  latitude: number;
  longitude: number;
  contactInformation: {
    // Define properties for contact information object here
    email:string;
    phone: string;
  };
  operatingHours: {
    // Define properties for operating hours object here
  };
  cityCouncilLicense: string;
  pharmacistCouncilLicense: string;
  healthProfessionsAuthorityLicense: string;
  medicinesControlAuthorityLicense: string;
  isBanned: boolean;
  bannedEnd: Date;
  isApproved: boolean;
  applicationStatus: string;
  applicationReason: string;
  isDeleted: boolean;
  onFreeTrial: boolean;
  trialEnds: Date;
  isSubscribed: boolean;
  subscriptionsEnds: Date;
  additionalNotes: string;
  __v: number;
}
