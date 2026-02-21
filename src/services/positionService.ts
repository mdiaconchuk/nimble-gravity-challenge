import type { Position } from "../types/position";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getPositions = async (): Promise<Position[]> => {
    const apiResponse = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!apiResponse.ok) {
        throw new Error(`Positions petition failed: ${apiResponse.statusText}`);
    }
    const positionsData = await apiResponse.json();
    return positionsData;
}