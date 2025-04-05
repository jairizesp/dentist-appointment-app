import { useState } from "react";
import Button from "../../components/button.component";
import Input from "../../components/input.component";
import loginBanner from "../../assets/login.svg";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    alert(`EMAIL: ${credentials.email}, PASSWORD: ${credentials.password}`);
  };

  return (
    <div className="flex flex-col px-4 w-full h-full lg:flex-row">
      <div className="lg:grow-1 lg:h-full flex justify-center items-center">
        <img src={loginBanner} alt="" />
      </div>
      <div className="grow-1 h-full flex justify-center items-center">
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
            <div className="w-full flex justify-end">
              <p className="float-right">
                Don't have an account yet?
                <span className="text-blue-500 ml-2">
                  <a href="/sign-up">Signup here</a>
                </span>
              </p>
            </div>
            <Button className="w-full" variant="primary" onClick={handleSubmit}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
