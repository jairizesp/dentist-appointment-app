import Button from "../../components/button.component";
import toothIcon from "../../assets/dental-care.png";
import { useNavigate } from "react-router-dom";

const SERVICES = ["General Dentistry", "Cosmetic Dentistry", "Orthodontics "];

const Home = () => {
  const navigate = useNavigate();

  function bookAppointment() {
    navigate("/bookings");
  }

  return (
    <div className="flex flex-col py-8 gap-8 text-purple-700">
      <section className="flex flex-col gap-4 xl:w-[600px]">
        <h1 className="text-5xl font-bold text-purple-800">
          Your trusted dental care
        </h1>
        <p>
          Provide exceptional dental care for your entire family. Our skilled
          and experienced dentists offer comprehensive, high-quality treatments
          in a comfortable, welcoming environment. Trust us to deliver
          personalized, friendly services that ensure your dental health and
          well-being.
        </p>
      </section>

      <section className="w-full flex flex-col justify-center items-center gap-8">
        <div className="flex gap-8">
          {SERVICES.map((service) => (
            <div
              key={service}
              className="flex flex-col items-center justify-center font-semibold text-lg"
            >
              <img src={toothIcon} alt="" width={100} height={100} />
              <p>{service}</p>
            </div>
          ))}
        </div>
        <Button
          key="sched-appointment-home-page"
          className="w-[200px] shadow-sm hover:border-none"
          onClick={bookAppointment}
        >
          Schedule Appointment
        </Button>
      </section>
    </div>
  );
};

export default Home;
