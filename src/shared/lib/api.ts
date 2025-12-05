import { Spirit, SpiritSchema } from "../types/spirit";

const API_BASE = "/api";

export async function fetchSpirits(): Promise<Spirit[]> {
  const response = await fetch(`${API_BASE}/spirits`);
  if (!response.ok) {
    throw new Error("Failed to fetch spirits");
  }
  const data = await response.json();
  return SpiritSchema.array().parse(data);
}

export async function captureSpirit(id: string): Promise<Spirit> {
  const response = await fetch(`${API_BASE}/spirits/${id}/capture`, {
    method: "POST",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to capture spirit");
  }
  const data = await response.json();
  return SpiritSchema.parse(data);
}
