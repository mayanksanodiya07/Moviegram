import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";


// localStorage.clear();

export default function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<><Homepage /> <LoginPage /></>}  /> */}
        <Route index element={<Homepage /> }  />
        <Route path="/login" element={<LoginPage />}  />
      </Routes>
    </BrowserRouter>
  );
}
