import type { Application } from "../types/application";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postApplication = async (
  uuid: string,
  jobId: number,
  candidateId: string,
  repoUrl: string,
  applicationId: string,
): Promise<{ ok: boolean }> => {
    
  const apiResponse = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uuid: uuid,
      jobId: jobId,
      candidateId: candidateId,
      repoUrl: repoUrl,
      applicationId: applicationId
    }),
  });

  if (!apiResponse.ok) {
    throw new Error(`Error while applying.`);
  }

  return await apiResponse.json();
};
