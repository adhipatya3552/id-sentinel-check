
// This is a mock database for demonstration purposes
// In a real application, this would connect to a backend API

export type VerificationResult = {
  isValid: boolean;
  message: string;
};

// Sample database of valid IDs
const validIds: string[] = [
  "ID123456",
  "ID789012",
  "USR345678",
  "EMP901234",
  "ADM567890"
];

/**
 * Verify if an ID exists in the database
 * @param id The ID to check
 * @returns VerificationResult with validation status and message
 */
export const verifyId = (id: string): VerificationResult => {
  // Simulate API call delay
  console.log("Verifying ID:", id);
  
  // Check if ID exists in our database
  const isValid = validIds.includes(id);
  
  if (isValid) {
    return {
      isValid: true,
      message: "ID verified successfully. This is a valid ID."
    };
  } else {
    return {
      isValid: false,
      message: "The ID is fake. Closing the website immediately."
    };
  }
};
