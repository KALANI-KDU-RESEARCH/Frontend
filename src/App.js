import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EDashBoard from "./components/eDashBoard";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash-board" element={<EDashBoard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
