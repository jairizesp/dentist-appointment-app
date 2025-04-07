import { getIdentity } from "../utils/helpers/tokenHelper";
import {
  Appointment,
  AppointmentParams,
} from "../utils/interface/api/appointment.interface";
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

export async function getPreviousAppointmentsByPatient(): Promise<
  AppointmentWithDentist[]
> {
  const userIdentity = getIdentity();
  const response = await apiClient.get(
    `/appointment/by-patient/history/${userIdentity?.id}`
  );

  const result = response.data;

  return result;
}

export async function cancelAppointment(id: number) {
  try {
    const response = await apiClient.put(
      `/appointment/cancel-appointment/${id}`
    );

    const result = response.data;

    return result;
  } catch (error: any) {
    throw error?.response?.data;
  }
}
