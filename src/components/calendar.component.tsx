import { JSX, useState } from "react";
import { ToastType, Toast } from "./toast.component";

// Utility functions to get month and year
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month - 1, 1).getDay();
};

interface CalendarProps {
  selectedDate: (date: string) => void;
  dentistId?: number;
  default_date?: string;
}

// Calendar Component
const Calendar = (props: CalendarProps) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    props.default_date
      ? Number(props.default_date.split("-")[1]) - 1
      : today.getMonth()
  );
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const [appointmentDate, setAppointmentDate] = useState("");

  const showToast = (type: ToastType, message: string) => {
    setToast({ message, type });
  };

  const handleAddAppointment = (date: string) => {
    if (!props.dentistId) {
      const toastMessage = "Please select a dentist first.";
      showToast("info", toastMessage);
      return;
    }
    props?.selectedDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };

  const renderCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentMonth + 1, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth + 1, currentYear);
    const days: JSX.Element[] = [];

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    let default_date = "";

    if (props.default_date) {
      const [year, month, day] = props.default_date.split("-");
      default_date = `${year}-${parseInt(month)}-${day}`;
    }

    // Get today's date as a string to compare against
    const todayStr = `${todayYear}-${todayMonth + 1}-${todayDate}`;

    // Add empty days at the start of the month to align the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="flex items-center justify-center"
        ></div>
      );
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;

      // Check if this is today's date
      let isToday =
        todayYear === currentYear &&
        todayMonth === currentMonth &&
        day === todayDate;

      // Check if the date is selected
      const isSelected = dateStr === appointmentDate;

      // Disable past dates
      const isPastDate = new Date(dateStr) < new Date(todayStr);

      console.log("DEFULT DATE: ", default_date);
      console.log("DATE STR: ", dateStr);
      // console.log("DEFAULT DATE: ", props.default_date == dateStr);
      days.push(
        <button
          key={`${currentYear}-${currentMonth + 1}-${day}`}
          className={`flex flex-col ${
            isPastDate
              ? "disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400"
              : "cursor-pointer"
          }
                     ${
                       isToday && !appointmentDate && !props.default_date
                         ? "bg-purple-800 text-purple-200"
                         : ""
                     }
                     ${
                       default_date == dateStr && !appointmentDate
                         ? "bg-purple-800 text-purple-200"
                         : ""
                     }
                     ${isSelected ? "bg-purple-800 text-purple-200" : ""}
                     items-center justify-start rounded-md border p-2 hover:bg-purple-800 hover:text-purple-200 active:scale-95 transition`}
          onClick={() => {
            if (!isPastDate) {
              if (props.dentistId) {
                setAppointmentDate(dateStr);
              }
              handleAddAppointment(dateStr);
            }
          }}
          disabled={isPastDate} // Disable the button for past dates
        >
          <div className="text-lg font-semibold">{day}</div>
          {/* {dayAppointments.map((app, index) => (
            <div
              key={index}
              className="text-xs text-gray-700 bg-blue-100 p-1 mt-1 rounded-sm"
            >
              <strong>{app.title}</strong>
              <p>{app.description}</p>
            </div>
          ))} */}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full lg:max-w-xl p-4 font-sans">
      <header className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="bg-purple-800 p-[5px] w-12 h-12 cursor-pointer text-purple-200 font-bold rounded-md hover:bg-purple-300 hover:text-purple-800 transition active:scale-95"
        >
          &lt;
        </button>
        <h2 className="text-2xl font-bold text-purple-800">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}
          &nbsp;
          {currentYear}
        </h2>
        <button
          onClick={handleNextMonth}
          className="bg-purple-800 p-[5px] w-12 h-12 cursor-pointer text-purple-200 font-bold  rounded-md hover:bg-purple-300 hover:text-purple-800 transition active:scale-95"
        >
          &gt;
        </button>
      </header>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
