import classNames from "classnames";
import React from "react";

const TripSearchForm = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div
      className={classNames(
        className,
        "w-full max-w-2xl p-4 bg-white rounded-xl shadow-lg sm:p-6 md:p-8",
      )}
    >
      <form action={"#"} className={"space-y-6"}>
        <h5 className={"text-xl font-medium text-gray-900"}>
          Sign in to our platform
        </h5>
        <div>
          <label
            className={"block mb-2 text-sm font-medium text-gray-900"}
            htmlFor={"email"}
          >
            Your email
          </label>
          <input
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
            id={"email"}
            name={"email"}
            placeholder={"name@company.com"}
            type={"email"}
            required
          />
        </div>
        <div>
          <label
            className={"block mb-2 text-sm font-medium text-gray-900"}
            htmlFor={"password"}
          >
            Your password
          </label>
          <input
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
            id={"password"}
            name={"password"}
            placeholder={"••••••••"}
            type={"password"}
            required
          />
        </div>
        <div className={"flex items-start"}>
          <div className={"flex items-start"}>
            <div className={"flex items-center h-5"}>
              <input
                className={
                  "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                }
                id={"remember"}
                type={"checkbox"}
                value={""}
                required
              />
            </div>
            <label
              className={"ml-2 text-sm font-medium text-gray-900"}
              htmlFor={"remember"}
            >
              Remember me
            </label>
          </div>
          <a
            className={"ml-auto text-sm text-blue-700 hover:underline"}
            href={"#"}
          >
            Lost Password?
          </a>
        </div>
        <button
          className={
            "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          }
          type={"submit"}
        >
          Login to your account
        </button>
        <div className={"text-sm font-medium text-gray-500"}>
          Not registered?{" "}
          <a className={"text-blue-700 hover:underline"} href={"#"}>
            Create account
          </a>
        </div>
      </form>
    </div>
  );
};

export default TripSearchForm;
