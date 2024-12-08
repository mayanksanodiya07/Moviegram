import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


// localStorage.clear();

export default function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<><Homepage /> <LoginPage /></>}  /> */}
        <Route index element={<Homepage /> }  />
        <Route path="/home" element={<Homepage />}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/signup" element={<Signup />}  />
      </Routes>
    </BrowserRouter>
  );
}
