import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx"; // Import the useAuthContext hook

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/Signup/SignUp.jsx";

function App() {
  const { authUser } = useAuthContext(); // Destructure authUser from the context value
  return (
    <div className="p-4 h-screen flex item-centre justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route
          path="/Login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/Signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
