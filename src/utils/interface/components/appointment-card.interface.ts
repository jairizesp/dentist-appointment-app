import { Appointment } from "../api/appointment.interface";
import { DentistInformation } from "../api/dentist.interface";

export interface AppointmentCardProps {
  isUpcoming?: boolean;
  onCancelSuccess?: () => void;
  className?: string;
  info: AppointmentInformation;
}

interface AppointmentInformation
  extends Appointment,
    Omit<DentistInformation, "id"> {}

export type AppointmentWithDentist = Appointment &
  Omit<DentistInformation, "id">;
