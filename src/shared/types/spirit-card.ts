import { Spirit } from "./spirit";

export interface SpiritCardProps {
  spirit: Spirit;
  onCapture: (id: string) => void;
  isCapturing?: boolean;
}
