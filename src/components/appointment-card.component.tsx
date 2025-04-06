import Button from "./button.component";
import { AppointmentCardProps } from "../utils/interface/components/appointment-card.interface";
import { appointmentDuration } from "../utils/helpers/range";

const AppointmentCard = (props: AppointmentCardProps) => {
  return (
    <>
      <div
        className={`rounded-md w-[350px] flex flex-col gap-6 flex-wrap border border-purple-300 shadow-sm py-4 px-6 ${
          props.isUpcoming ?? "text-slate-400"
        }`}
      >
        <div className="flex flex-col gap-2 font-semibold">
          <p className=" text-xl">{props.info.last_name}</p>
          <p>
            {new Date(props.info.appointment_date).toLocaleString("default", {
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
          <p>{appointmentDuration(props.info.from, props.info.to)}</p>
        </div>

        {props.isUpcoming && (
          <div className="flex gap-4">
            <Button key="card-resched-btn">Reschedule</Button>
            <Button key="card-cancel-btn">Cancel</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentCard;
