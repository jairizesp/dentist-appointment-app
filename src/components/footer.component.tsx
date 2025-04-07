import logo from "../assets/tooth-logo.png";

const Footer = () => {
  return (
    <div className="w-full px-16 py-4 h-[200px] bg-white xl:px-24 flex justify-between items-center">
      <div className="flex gap-8 items-center">
        <img src={logo} alt="" width={90} height={90} />
        <p className="font-bold text-purple-800 text-3xl">
          Your Trusted Dental Health Care
        </p>
      </div>
    </div>
  );
};

export default Footer;
