import { useEffect, useState } from "react";
import Button from "../../components/button.component";
import Input from "../../components/input.component";
import loginBanner from "../../assets/login.svg";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/helpers/tokenHelper";
import { userLogin } from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      navigate("/");
    }
  }, []);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await userLogin(credentials);

    setIsLoading(false);
    if (res.access_token) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col px-4 lg:gap-8 xl:gap-0 w-full h-screen lg:flex-row">
      <div className="flex-1 xl:flex-[1.2] lg:h-full flex justify-center items-center">
        <img src={loginBanner} alt="" className="w-full h-full" />
      </div>
      <div className="flex-2 lg:flex-1 xl:flex-1 h-full flex justify-center items-center">
        <div className="w-full xl:w-3/5 h-full">
          <form className="h-full flex flex-col justify-start lg:justify-center gap-2 items-center">
            <div className="w-full text-left mb-8">
              <h1 className="text-4xl font-semibold text-purple-800">Login</h1>
            </div>
            <Input
              label="Email"
              value={credentials.email}
              onChange={handleCredentialChange}
              error={error}
              placeholder="Enter your email"
              name="email"
              className="w-full"
              type="email"
              // required={true}
            />
            <Input
              label="Password"
              value={credentials.password}
              onChange={handleCredentialChange}
              error={error}
              placeholder="Enter your password"
              name="password"
              type="password"
              // required={true}
            />
            <div className="w-full flex justify-end mb-4">
              <p className="float-right">
                Don't have an account yet?
                <span className="text-purple-600 ml-2 font-semibold">
                  <a href="/sign-up" className="nav__link">
                    Signup here
                  </a>
                </span>
              </p>
            </div>
            <Button
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
