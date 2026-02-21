import type { Candidate } from "../types/candidate";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCandidateInfo = async (email: string): Promise<Candidate> => {
  const apiResponse = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
  );
  if (!apiResponse.ok) {
    throw new Error(`Candidate petition failed: ${apiResponse.statusText}`);
  }
  const candidateData = await apiResponse.json();
  return candidateData as Candidate;
};
