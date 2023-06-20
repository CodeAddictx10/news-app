import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../types";
import { isEmailHandler } from "../Helpers";
import Loader from "../components/icons/Loader";
import axios from "axios";
import { mutate } from "swr";
import { useUser } from "../Api/useUser";
import Alert from "../components/Alert";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      errorMessage && setErrorMessage("");
      setIsLoading(true);
      const response = await axios.post("/v1/login", data);
      const {
        data: { token },
      } = response.data;
      localStorage.setItem("token", token);
      reset();
      mutate("/v1/users");
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
        return;
      }
      const errorMessage = (error as Error).message;
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) navigate("/", { replace: true });

  return (
    <div className="flex flex-col flex-wrap items-center justify-center h-screen max-w-screen-xl px-4 mx-auto font-body">
      <div className="mb-4 text-center">
        <Logo />
      </div>
      <h1 className="mb-8 text-xl font-bold text-center dark:text-white">
        Login
      </h1>
      <form className="w-[300px] " onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <Alert message={errorMessage} />}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="custom-input"
            placeholder="name@flowbite.com"
            {...register("email", {
              required: "Email is Required",
              validate: {
                isEmail: (value) =>
                  isEmailHandler(value) || "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <small className="text-red-1x">{errors.email.message}</small>
          )}
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="inline-block ml-2 text-xs cursor-pointer hover:text-red-2x"
            >
              {isPasswordVisible ? "hide" : "show"}
            </span>
          </div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            className="custom-input"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <small className="text-red-1x">{errors.password.message}</small>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="flex btn " disabled={isLoading}>
            <span className="mr-2"> Login</span>
            {isLoading && <Loader />}
          </button>
          <Link
            to="/register"
            className="text-sm hover:text-red-1x dark:text-white"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
