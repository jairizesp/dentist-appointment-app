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

export interface ReschedAppointment {
  id: number;
  appointment_date: string;
  from: number;
  to: number;
}
