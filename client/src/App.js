import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectIndexScreen from "./project/ProjectIndexScreen";
import "./bootstrap.css";
import "./index.css";
import LoginScreen from "./auth/LoginScreen";
import DashboardScreen from "./clock/DashboardScreen";
import RegisterScreen from "./auth/RegisterScreen";
import ProjectEditScreen from "./project/ProjectEditScreen";
import ProjectCreateScreen from "./project/ProjectCreateScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<DashboardScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/projects' element={<ProjectIndexScreen />} />
          <Route path='/projects/create' element={<ProjectCreateScreen />} />
          <Route path='/projects/:id' element={<ProjectEditScreen />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
