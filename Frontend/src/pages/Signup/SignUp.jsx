import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [input, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const HandleCheckBoxChange = (gender) => {
    setInputs({ ...input, gender });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500">ChatApp</span>
        </h1>
        <form onSubmit={HandleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Fullname</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Your Fullname"
              value={input.fullname}
              onChange={(e) => {
                setInputs({ ...input, fullname: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="This Is What People Will See"
              value={input.username}
              onChange={(e) => {
                setInputs({ ...input, username: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Password"
              value={input.password}
              onChange={(e) => {
                setInputs({ ...input, password: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">ConfirmPassword</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="ConfirmPassword"
              value={input.confirmPassword}
              onChange={(e) => {
                setInputs({ ...input, confirmPassword: e.target.value });
              }}
            />
          </div>

          <GenderCheckBox
            onCheckBoxChange={HandleCheckBoxChange}
            selectedGender={input.gender}
          />

          <a href="Login" className="link link-hover">
            Already have an Account ?
          </a>
          <div>
            <button className="btn btn-wide" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

//Sign Up Starter Code
/* const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500">ChatApp</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Fullname</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Your Fullname"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="This Is What People Will See"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">ConfirmPassword</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="ConfirmPassword"
            />
          </div>
          // Gender CheckBox 
          <a href="#" className="link link-hover">
            Already have an Account ?
          </a>
          <div>
            <button className="btn btn-wide">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp; */
