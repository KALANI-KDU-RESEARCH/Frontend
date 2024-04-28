import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EDashBoard from "./components/eDashBoard";
import Login from "./components/login";
import Register from "./components/register";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dash-board"
          element={
            <PrivateRoute>
              <EDashBoard />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
