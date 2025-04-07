import React, { useEffect, useState } from "react";
import Button from "../../components/button.component";
import Input from "../../components/input.component";
import signupBanner from "../../assets/signup.svg";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/helpers/tokenHelper";
import { userSignup } from "../../services/auth.service";
import { UserInformation } from "../../utils/interface/api/auth.interface";
import { Toast, ToastType } from "../../components/toast.component";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ message, type });
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      navigate("/");
    }
  }, []);

  const [error, _] = useState("");

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const payload: Omit<UserInformation, "id"> = {
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        email: credentials.email,
        password: credentials.password,
      };
      const response = await userSignup(payload);

      if (response) {
        showToast("success", "Registration Successful");
        setIsLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 900);
      }
    } catch (error: any) {
      const toastMessage = error.message;
      showToast("error", toastMessage);
    }
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
              error={error}
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
              error={error}
              placeholder="Enter your password"
              name="password"
              type="password"
              required={true}
            />
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
