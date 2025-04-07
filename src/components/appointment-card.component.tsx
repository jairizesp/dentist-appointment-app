import Button from "./button.component";
import { AppointmentCardProps } from "../utils/interface/components/appointment-card.interface";
import { appointmentDuration } from "../utils/helpers/range";
import { FaUserDoctor } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cancelAppointment } from "../services/appointment.service";
import { Toast, ToastType } from "./toast.component";
import { formatDate } from "../utils/helpers/date";

const AppointmentCard = (props: AppointmentCardProps) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ message, type });
  };

  const [convertToDate, setConvertToDate] = useState<any>();
  useEffect(() => {
    const dateParts = props.info.appointment_date.split("/"); // Split by "/"
    const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
      2,
      "0"
    )}-${dateParts[1].padStart(2, "0")}`; // Format as YYYY-MM-DD
    const dateStr = `${formattedDate}T00:00:00Z`;
    const validDate = new Date(dateStr);
    console.log(validDate);

    setConvertToDate(validDate);
  }, []);

  const handleCancelAppointment = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await cancelAppointment(id);

      if (response) {
        console.log(response);
        if (props.onCancelSuccess) {
          props.onCancelSuccess(); // Trigger re-fetch in parent
        }
        showToast("success", "Success");
        setIsLoading(false);
      }
    } catch (error: any) {
      showToast("error", error.data.message);
    }
  };

  return (
    <>
      <div
        className={`rounded-md w-[350px] flex flex-col gap-6 flex-wrap border border-purple-300 shadow-sm py-4 px-6 ${
          !props.isUpcoming ? "text-slate-500 bg-gray-200 border-none" : ""
        } ${props.className}`}
      >
        <div className="flex flex-col gap-2 font-semibold">
          <div className="flex gap-2 items-center text-xl">
            <span>
              <FaUserDoctor
                size={25}
                color={`${props.isUpcoming ? "#a855f7" : "#9ca3af"}`}
              />
            </span>
            <p>
              Dr. {props.info.first_name} {props.info.last_name}
            </p>
          </div>
          <p>
            {new Date(convertToDate).toLocaleString("en-US", {
              timeZone: "UTC",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
          <p>{appointmentDuration(props.info.from, props.info.to)}</p>
        </div>

        {props.isUpcoming && (
          <div className="flex gap-4">
            <Button
              key="card-resched-btn"
              onClick={() =>
                navigate(
                  `/bookings/${props.info.dentist_id}/${formatDate(
                    props.info.appointment_date
                  )}/${props.info.id}`
                )
              }
            >
              Reschedule
            </Button>
            <Button
              key="card-cancel-btn"
              isLoading={isLoading}
              onClick={() => handleCancelAppointment(props.info.id)}
            >
              Cancel
            </Button>
          </div>
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
};

export default AppointmentCard;
