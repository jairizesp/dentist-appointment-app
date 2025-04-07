import { useEffect, useState } from "react";
import Calendar from "../../components/calendar.component";
import { DentistInformation } from "../../utils/interface/api/dentist.interface";
import { getDentists } from "../../services/dentist.service";
import {
  addAppointment,
  getAppointmentsByDentist,
} from "../../services/appointment.service";
import { Appointment } from "../../utils/interface/api/appointment.interface";
import Button from "../../components/button.component";
import { getIdentity } from "../../utils/helpers/tokenHelper";
import { useNavigate, useParams } from "react-router-dom";

const APPOINTMENTS = [
  { from_value: 8, from_label: "8 AM", to_value: 9, to_label: "9 AM" },
  { from_value: 9, from_label: "9 AM", to_value: 10, to_label: "10 AM" },
  { from_value: 10, from_label: "10 AM", to_value: 11, to_label: "11 AM" },
  { from_value: 11, from_label: "11 AM", to_value: 12, to_label: "12 PM" },
  { from_value: 12, from_label: "12 PM", to_value: 1, to_label: "1 PM" },
  { from_value: 1, from_label: "1 PM", to_value: 2, to_label: "2 PM" },
  { from_value: 2, from_label: "2 PM", to_value: 3, to_label: "3 PM" },
  { from_value: 3, from_label: "3 PM", to_value: 4, to_label: "4 PM" },
  { from_value: 4, from_label: "4 PM", to_value: 5, to_label: "5 PM" },
];
const Booking = () => {
  const navigate = useNavigate();
  const { id, date } = useParams();
  const [dentists, setDentists] = useState<DentistInformation[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<number>(
    Number(id) ?? 0
  );

  const [isReschedule, setIsReschedule] = useState(false);

  const [appointmentDate, setAppointmentDate] = useState(
    date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString()
  );
  const [selectedAppointment, setSelectedAppointment] = useState<{
    from: number;
    to: number;
  }>({ from: 0, to: 0 });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id && date) {
      setIsReschedule(true);
    } else {
      setIsReschedule(false);
    }
    const load = async () => {
      setIsLoading(true);
      const data = await getDentists();

      if (data) {
        setIsLoading(false);
        setDentists(data);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const loadAppointments = async () => {
      const result = await getAppointmentsByDentist({
        dentist_id: selectedDentist,
        appointment_date: appointmentDate,
      });

      if (result) {
        setAppointments(result);
      }
    };
    if (appointmentDate && selectedDentist) {
      loadAppointments();
    }
  }, [appointmentDate, selectedDentist]);

  const handleSelectAppointment = (appointment: {
    from: number;
    to: number;
  }) => {
    setSelectedAppointment(appointment);
  };

  useEffect(() => {}, [selectedAppointment]);

  const handleSelectDentist = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedDentist(selectedId);
  };

  const handleConfirmAppointment = async () => {
    setIsLoading(true);
    const userIdentity = getIdentity();

    const payload: Omit<Appointment, "id"> = {
      appointment_date: appointmentDate,
      dentist_id: selectedDentist,
      user_id: Number(userIdentity?.id),
      from: selectedAppointment?.from,
      to: selectedAppointment?.to,
    };

    const result = await addAppointment(payload);

    if (result) {
      setIsLoading(false);
      navigate("/dashboard");
    }
  };

  const isScheduled = (from: number) => {
    return appointments.some((appointment) => appointment.from == from);
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="text-3xl font-bold text-purple-800">
        {id && date ? "Reschedule Appointment" : "Book an Appointment"}
      </h1>
      <div className="w-full flex flex-col  lg:flex-row gap-8">
        <div className="flex  flex-col flex-1 justify-center lg:justify-start">
          <select
            value={selectedDentist}
            disabled={isLoading || isReschedule}
            onChange={handleSelectDentist}
            className="px-4 py-2 border border-purple-800 rounded-md font-semibold disabled:border-gray-200 disabled:text-gray-400"
          >
            <option value="0">Select a dentist</option>
            {!isLoading &&
              dentists.map((dentist) => (
                <option
                  key={`dentist-${dentist.id}`}
                  className="font-semibold"
                  value={dentist.id}
                >
                  Dr. {dentist.last_name} - {dentist.specialization}
                </option>
              ))}
          </select>
          <Calendar
            default_date={date}
            selectedDate={setAppointmentDate}
            dentistId={selectedDentist}
          />
        </div>
        <div className="flex-2 flex flex-col justify-between  p-4  rounded-lg border border-purple-500">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-purple-800">
              Select an appointment
            </h2>
            <div className="flex gap-6 flex-wrap text-purple-800 font-semibold">
              {APPOINTMENTS.map((appointment, idx) => (
                <Button
                  key={`${appointment.from_label}-${appointment.from_value}-${idx}`}
                  variant="secondary"
                  disabled={
                    !selectedDentist || isScheduled(appointment.from_value)
                  }
                  className={`w-full md:w-auto ${
                    selectedAppointment?.from == appointment.from_value
                      ? "bg-purple-800 text-purple-200"
                      : ""
                  }`}
                  onClick={() =>
                    handleSelectAppointment({
                      from: appointment.from_value,
                      to: appointment.to_value,
                    })
                  }
                >
                  {appointment.from_label} - {appointment.to_label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex mt-8 md:mt-0 justify-end">
            <Button
              key="confirm-appointment-button"
              disabled={!selectedAppointment.from}
              onClick={handleConfirmAppointment}
              isLoading={isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
