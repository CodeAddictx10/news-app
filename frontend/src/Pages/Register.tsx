import React, { useState } from "react";
import Logo from "../components/Logo";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRegister } from "../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/icons/Loader";
import Alert from "../components/Alert";
import { mutate } from "swr";
import { isEmailHandler } from "../Helpers";

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      errorMessage && setErrorMessage("");
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 10000));
      const response = await axios.post("/v1/users", data);
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

  return (
    <div className="flex flex-col flex-wrap items-center justify-center h-screen max-w-screen-xl px-4 mx-auto font-body">
      <div className="mb-4 text-center">
        <Logo />
      </div>
      <h1 className="mb-8 text-xl font-bold text-center dark:text-white">
        Register a New Account
      </h1>
      <form className="w-[300px]" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <Alert message={errorMessage} />}
        <div className="mb-6">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            className="custom-input"
            placeholder="Enter first name"
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <small className="text-red-1x">{errors.first_name.message}</small>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            className="custom-input"
            placeholder="Enter first name"
            {...register("last_name", { required: "Last name is required" })}
          />
          {errors.last_name && (
            <small className="text-red-1x">{errors.last_name.message}</small>
          )}
        </div>

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
              className="inline-block ml-2 text-xs cursor-pointer hover:text-red-2x dark:text-white"
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
              minLength: {
                value: 6,
                message: "Passowrd must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <small className="text-red-1x">{errors.password.message}</small>
          )}
        </div>

        <button type="submit" className="flex btn " disabled={isLoading}>
          <span className="mr-2"> Register new account</span>
          {isLoading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default Register;
