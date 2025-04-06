import { DentistInformation } from "../utils/interface/api/dentist.interface";
import apiClient from "./axios";

export async function getDentists(): Promise<DentistInformation[]> {
  const response = await apiClient.get("/dentist");

  const result: DentistInformation[] = response.data;

  return result;
}
