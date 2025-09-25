"use server";
import { FormValues } from "@/components/FreelancerProfile/Section2/Settings";

export async function updateFreelancerProfile(formData: FormValues, token: string | undefined) {
    console.log(formData, token, 'ttttttttttt')
    try {
      const response = await fetch("http://127.0.0.1:6565/api/v1/freelancer/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });
  
      if (!response.ok) {
        throw new Error( "Failed to update profile");
      }
  
      const result = await response.json();
      console.log(result, 'result')
    if (!response.ok) {
      throw new Error(result.message || "Failed to update profile");
    }

    // Return freelancer object directly for easier usage
    return result.data.freelancer;
  } catch (error) {
    throw error;
  }
}