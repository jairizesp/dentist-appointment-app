export interface Appointment extends AppointmentParams {
  id: number;
  user_id: number | undefined;
  from: number;
  to: number;
}

export interface AppointmentParams {
  dentist_id: number;
  appointment_date: string;
}
