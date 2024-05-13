import GenderCheckBox from "./GenderCheckBox";

const SignUp = () => {
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

          <GenderCheckBox />

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
