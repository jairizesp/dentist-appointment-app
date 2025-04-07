import React, { useEffect, useState } from "react";
import Button from "../../components/button.component";
import Input from "../../components/input.component";
import signupBanner from "../../assets/signup.svg";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/helpers/tokenHelper";
import { userSignup } from "../../services/auth.service";
import { UserInformation } from "../../utils/interface/api/auth.interface";
import { Toast, ToastType } from "../../components/toast.component";
import { isValidEmail, isValidPassword } from "../../utils/helpers/auth";
import { TbEyeClosed } from "react-icons/tb";
import { RxEyeOpen } from "react-icons/rx";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const formHasEmptyValue = () => {
    const values = Object.values(credentials);
    return values.some((value) => value == "");
  };

  const showToast = (type: ToastType, message: string) => {
    setToast({ message, type });
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      navigate("/");
    }
  }, []);

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (formHasEmptyValue()) {
        showToast("error", "Please fill all forms");
        return;
      }

      if (!isValidEmail(credentials.email)) {
        showToast("error", "Must provide a valid email");

        setError("Invalid Password");

        return;
      }

      if (!isValidPassword(credentials.password)) {
      }

      setIsLoading(true);

      const payload: Omit<UserInformation, "id"> = {
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        email: credentials.email,
        password: credentials.password,
      };
      const result = await userSignup(payload);
      console.log(result);

      if (result?.response?.status_code == 200) {
        showToast("success", "Registration Successful");

        setTimeout(() => {
          navigate("/");
        }, 900);
      } else {
        showToast("error", result.message);
      }
    } catch (error: any) {
      const toastMessage = error.message;
      showToast("error", toastMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordVisibility = () => {
    setIsShowPassword((prev) => {
      const toggleShow = !prev;
      if (toggleShow) {
        setInputType("text");
      } else {
        setInputType("password");
      }
      return toggleShow;
    });
  };

  const renderPasswordToggle = () => {
    if (isShowPassword) {
      return (
        <>
          <TbEyeClosed
            size={25}
            className="cursor-pointer hover:scale-110 active:scale-95 absolute top-8 right-4 z-10"
            onClick={handlePasswordVisibility}
          />
        </>
      );
    }

    return (
      <>
        <RxEyeOpen
          size={25}
          className="cursor-pointer hover:scale-110 active:scale-95 absolute top-8 right-4 z-10"
          onClick={handlePasswordVisibility}
        />
      </>
    );
  };

  return (
    <div className="w-full h-screen flex px-4 flex-col-reverse lg:flex-row">
      <div className="grow-[1.5] h-full flex justify-center items-center">
        <div className="w-full xl:w-3/5 h-full">
          <form className="h-full flex flex-col justify-start mt-6 lg:justify-center gap-2 items-center">
            <div className="w-full text-left mb-8">
              <h1 className="text-4xl font-semibold text-purple-800">Signup</h1>
            </div>
            <Input
              key="signup-first-name"
              label="First Name"
              value={credentials.firstName}
              onChange={handleCredentialChange}
              error={error}
              placeholder="Enter your first name"
              name="firstName"
              className="w-full"
              required={true}
            />
            <Input
              key="signup-last-name"
              label="Last Name"
              value={credentials.lastName}
              onChange={handleCredentialChange}
              error={error}
              placeholder="Enter your last name"
              name="lastName"
              required={true}
            />

            <Input
              key="signup-email"
              label="Email"
              value={credentials.email}
              onChange={handleCredentialChange}
              error={
                !isValidEmail(credentials.email) && credentials.email.length > 6
              }
              placeholder="Enter your email"
              name="email"
              className="w-full"
              required={true}
            />
            <Input
              key="signup-password"
              label="Password"
              value={credentials.password}
              onChange={handleCredentialChange}
              error={
                !isValidPassword(credentials.password) &&
                credentials.password.length > 0
              }
              placeholder="Enter your password"
              name="password"
              type={inputType}
              required={true}
            >
              {renderPasswordToggle()}
            </Input>

            {!isValidPassword(credentials.password) &&
              credentials.password.length > 0 && (
                <i className=" text-sm text-red-600 w-full -mt-4 text-left font-medium">
                  Minimum 8 characters, at least one Uppercase Letter, Lower
                  Letter, Number and special character
                </i>
              )}
            <div className="w-full flex justify-end">
              <p className="float-right">
                Already have an account?
                <span className="nav__link text-purple-600 ml-2 font-semibold">
                  <a href="/login">Login</a>
                </span>
              </p>
            </div>
            <Button
              key="sign-up-btn-key"
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              disabled={
                formHasEmptyValue() ||
                !isValidEmail(credentials.email) ||
                !isValidPassword(credentials.password)
              }
              isLoading={isLoading}
            >
              Signup
            </Button>
          </form>
        </div>
      </div>
      <div className="lg:h-full flex justify-center items-center mt-16">
        <img src={signupBanner} alt="" />
      </div>

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

export default Signup;
