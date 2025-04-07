import { useEffect, useState } from "react";
import AppointmentCard from "../../components/appointment-card.component";
import { AppointmentWithDentist } from "../../utils/interface/components/appointment-card.interface";
import {
  getAppointmentsByPatient,
  getPreviousAppointmentsByPatient,
} from "../../services/appointment.service";
import Spinner from "../../components/spinnert.component";
const Dashboard = () => {
  const [appointments, setAppointments] = useState<AppointmentWithDentist[]>(
    []
  );

  const [previousAppointments, setPreviousAppointments] = useState<
    AppointmentWithDentist[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const loadAppointments = async () => {
    setIsLoading(true);
    const result = await getAppointmentsByPatient();
    const result2 = await getPreviousAppointmentsByPatient();

    if (result) {
      setAppointments(result);
    }

    if (result2) {
      setPreviousAppointments(result);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancelSuccess = () => {
    loadAppointments();
  };

  const renderAppointments = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (!appointments.length && !isLoading) {
      return <p>No appointmens found.</p>;
    }

    return (
      <div className="flex flex-wrap gap-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={`${appointment.dentist_id}-${appointment.appointment_date}-${appointment.id}`}
            isUpcoming={true}
            info={appointment}
            onCancelSuccess={handleCancelSuccess}
          />
        ))}
      </div>
    );
  };

  const renderPastAppointments = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (!appointments.length && !isLoading) {
      return <p>No past appointmens found.</p>;
    }

    return (
      <div className="flex flex-wrap gap-4">
        {previousAppointments.map((appointment) => (
          <AppointmentCard
            key={`${appointment.dentist_id}-${appointment.appointment_date}-${appointment.from}-${appointment.to}`}
            isUpcoming={false}
            info={appointment}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="text-3xl text-purple-800 font-bold">User Dashboard</h1>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-0 w-full ">
        <section className="flex flex-col gap-8 flex-1 lg:border-r lg:border-slate-300">
          <h2 className="text-xl text-purple-800 font-semibold">
            Upcoming Appointments
          </h2>

          {renderAppointments()}
        </section>

        <section className="flex flex-1 flex-col gap-8 lg:pl-8">
          <h2 className="text-xl text-purple-800  font-semibold text-left">
            Past Appointments
          </h2>
          <div className="flex flex-wrap gap-4">{renderPastAppointments()}</div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
