import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {

  const [Loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
    const success = HandleInputErrors({ fullname, username, password, confirmPassword, gender })
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
      })

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //localstorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      //context
      setAuthUser(data);


    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { Loading, signup };
}

export default useSignup


function HandleInputErrors({ fullname, username, password, confirmPassword, gender }) {
  if (!fullname || !username || !password || !confirmPassword || !gender) {
    toast.error("Please Fill All The Fields");
    return false;
  }

  if (password != confirmPassword) {
    toast.error("password and confirmPassword Dosen't Match");
    return false;
  }

  if (password.length < 6) {
    toast.error("passwrod must be at least 6 character");
    return false;
  }

  return true;
}