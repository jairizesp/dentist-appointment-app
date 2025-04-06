import { getIdentity } from "../utils/helpers/tokenHelper";
import {
  Appointment,
  AppointmentParams,
} from "../utils/interface/api/appointment.interface";
import { DentistInformation } from "../utils/interface/api/dentist.interface";
import { AppointmentWithDentist } from "../utils/interface/components/appointment-card.interface";
import apiClient from "./axios";

export async function getAppointmentsByDentist(
  params: AppointmentParams
): Promise<Appointment[]> {
  const response = await apiClient.get("/appointment/by-dentist", { params });

  const result: Appointment[] = response.data;
  console.log(result);

  return result;
}

export async function addAppointment(payload: Omit<Appointment, "id">) {
  const response = await apiClient.post(
    "/appointment/add-appointment",
    payload
  );
  console.log(response);

  const result = response.data;

  return result;
}

export async function getAppointmentsByPatient(): Promise<
  AppointmentWithDentist[]
> {
  const userIdentity = getIdentity();
  const response = await apiClient.get(
    `/appointment/by-patient/upcoming/${userIdentity?.id}`
  );

  const result = response.data;

  return result;
}
