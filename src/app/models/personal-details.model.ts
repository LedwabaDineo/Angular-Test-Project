export interface PersonalDetails {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    identityNumber: string;
    mobileNumber: string;
    gender: string;
    maritalStatus: string;
    username: string;
    address: {
      line1: string;
      line2: string;
      line3: string;
      suburb: string;
      city: string;
      postalCode: string;
      country: string;
    };
  }
  