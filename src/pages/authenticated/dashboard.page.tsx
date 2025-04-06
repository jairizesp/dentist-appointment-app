import { useEffect, useState } from "react";
import AppointmentCard from "../../components/appointment-card.component";
import { AppointmentWithDentist } from "../../utils/interface/components/appointment-card.interface";
import { getAppointmentsByPatient } from "../../services/appointment.service";
const Dashboard = () => {
  const [appointments, setAppointments] = useState<AppointmentWithDentist[]>(
    []
  );

  const [previousAppointments, setPreviousAppointments] = useState<
    AppointmentWithDentist[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const result = await getAppointmentsByPatient();

      if (result) {
        setAppointments(result);
      }
    };

    load();
  }, []);

  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="text-3xl text-purple-800 font-bold">User Dashboard</h1>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-0 w-full ">
        <section className="flex flex-col gap-8 flex-1 lg:border-r lg:border-slate-300">
          <h2 className="text-xl text-purple-800 font-semibold">
            Upcoming Appointments
          </h2>

          <div className="flex flex-wrap gap-4">
            {appointments.map((appointment) => (
              <AppointmentCard isUpcoming={true} info={appointment} />
            ))}
          </div>
        </section>

        <section className="flex flex-1 flex-col gap-8 lg:pl-8">
          <h2 className="text-xl text-purple-800  font-semibold text-left">
            Past Appointments
          </h2>
          <div className="flex flex-wrap gap-4"></div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
